import prisma from "@/lib/prisma";
import { extractDomain } from "@/lib/utils";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { code, code_verifier } = await req.json();

    if (!code || !code_verifier) {
        return NextResponse.json({ ok: false, message: "Missing code or verifier" }, { status: 400 });
    }

    const authCode = await prisma.authCode.findUnique({ where: { code } });

    if (!authCode || authCode.used) {
        return NextResponse.json({ ok: false, message: "Invalid or already-used code" }, { status: 404 });
    }

    if (authCode.expiresAt < new Date()) {
        return NextResponse.json({ ok: false, message: "Code expired" }, { status: 410 });
    }

    const computedChallenge = base64url(crypto.createHash("sha256").update(code_verifier).digest());
    if (computedChallenge !== authCode.codeChallenge) {
        return NextResponse.json({ ok: false, message: "PKCE verification failed" }, { status: 401 });
    }
    try {
        await prisma.authCode.update({ where: { code }, data: { used: true } });

        const webhookSecret = crypto.randomBytes(24).toString("hex");
        const domain = extractDomain(authCode.storeUrl);

        if (!domain) {
            throw new Error("Invalid store URL, unable to extract domain");
        }

        const connectedShop = await prisma.shop.upsert({
            where: { domain },
            update: {
                platform: authCode.platform as 'woocommerce' | 'shopify',
                webhookSecret,
                organizationId: authCode.orgId
            },
            create: {
                organizationId: authCode.orgId,
                platform: 'woocommerce',
                domain,
                webhookSecret
            }
        });

        const deliveryUrl = `https://29df-103-231-239-131.ngrok-free.app/api/webhook/woocommerce`;

        return NextResponse.json({
            ok: true,
            org_id: connectedShop.organizationId,
            webhook_secret: connectedShop.webhookSecret,
            delivery_url: deliveryUrl,
        });
    } catch (error: any) {
        console.error("Error during shop connection:", error.message);
        return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 });
    }
}

function base64url(buf: Buffer) {
    return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}