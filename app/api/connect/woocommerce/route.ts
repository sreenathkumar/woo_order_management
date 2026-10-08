import prisma from "@/lib/prisma";
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

    await prisma.authCode.update({ where: { code }, data: { used: true } });

    const webhookSecret = crypto.randomBytes(24).toString("hex");

    const connectedShop = await prisma.shop.upsert({
        where: { domain: authCode.storeUrl },
        update: {
            platform: authCode.platform as 'woocommerce' | 'shopify',
            webhookSecret,
            organizationId: authCode.orgId
        },
        create: {
            organizationId: authCode.orgId,
            platform: 'woocommerce',
            domain: authCode.storeUrl,
            webhookSecret
        }
    });

    const deliveryUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook/woocommerce`;

    return NextResponse.json({
        ok: true,
        org_id: connectedShop.organizationId,
        webhook_secret: connectedShop.webhookSecret,
        delivery_url: deliveryUrl,
    });
}

function base64url(buf: Buffer) {
    return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}