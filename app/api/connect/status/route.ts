import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";


const MAX_CLOCK_SKEW_SECONDS = 300;

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { ts, store_url, sig, platform } = body;


    if (!ts || !store_url || !sig || !platform) {
        return NextResponse.json({ ok: false, message: "Missing params" }, { status: 400 });
    }

    const age = Math.abs(Date.now() / 1000 - Number(ts));
    if (!Number.isFinite(age) || age > MAX_CLOCK_SKEW_SECONDS) {
        return NextResponse.json({ ok: false, message: "Stale request" }, { status: 401 });
    }

    const shop = await prisma.shop.findUnique({ where: { domain: store_url, platform } });

    if (!shop || !shop.webhookSecret) {
        //unknown store 
        return NextResponse.json({ ok: true, connected: false });
    }

    // Must match exactly how the plugin built the signed string.
    const signedStr = `${ts}.${store_url}`;
    const expected = crypto.createHmac("sha256", shop.webhookSecret).update(signedStr).digest("hex");

    const valid =
        expected.length === sig.length &&
        crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig));

    if (!valid) {
        return NextResponse.json({ ok: false, message: "Invalid signature" }, { status: 401 });
    }

    return NextResponse.json({
        ok: true,
        connected: true,
        store_url,
    });
}