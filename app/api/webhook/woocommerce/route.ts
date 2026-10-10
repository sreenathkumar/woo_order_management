import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { extractDomain } from '@/lib/utils';
import { handleCreateOrderEvent } from './order-create';
import { handleOrderUpdateEvent } from './order-update';
import { handleOrderDeleteEvent } from './order-delete';

export async function POST(request: Request) {
    try {
        const rawBody = await request.text();
        const domain = extractDomain(request.headers.get('x-wc-webhook-source') || '');
        const topic = request.headers.get("x-wc-webhook-topic");

        // Handle WooCommerce test pings (e.g., "webhook_id=44")
        if (rawBody.startsWith('webhook_id=') || !domain) {
            return NextResponse.json({ ok: true }, { status: 200 });
        }

        if (!topic || !topic.startsWith("order.")) {
            return NextResponse.json({ ok: true });
        }

        //check if the domain is connected with the platform
        const connectedShop = await prisma.shop.findUnique({
            where: { domain },
        });


        if (!connectedShop) {
            console.error('Received webhook from unrecognized domain:', domain);
            return NextResponse.json({ error: 'Unrecognized domain' }, { status: 403 });
        }

        //verify the webhook signature
        const signature = request.headers.get('x-wc-webhook-signature');
        const isSignatureValid = verifyWooSignature({
            rawBody,
            signature,
            secret: connectedShop.webhookSecret
        });

        if (!isSignatureValid) {
            return NextResponse.json({ ok: false, message: "Invalid signature" }, { status: 401 });
        }

        // Safely parse actual JSON payloads
        let body;

        try {
            body = JSON.parse(rawBody);
        } catch (err: any) {
            throw new Error('Failed to parse raw body as JSON: ' + err.message);
        }

        // Handle order created event
        if (topic === "order.created") {
            await handleCreateOrderEvent({ body, domain, shopId: connectedShop.id });
        }

        // Handle order updated event
        if (topic === "order.updated") {
            console.log('Order updated event received:', body);
            // You can implement order update handling logic here if needed
            await handleOrderUpdateEvent({ body, domain, shopId: connectedShop.id });
        }

        // Handle order deleted event
        if (topic === "order.deleted") {
            console.log('Order deleted event received:', body);

            await handleOrderDeleteEvent({ body, domain, shopId: connectedShop.id });
        }


        // Always return a fast 200 OK to WooCommerce
        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error('Webhook error:', error);
        // Return 500 only if something fundamentally broke on your server side
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

interface VerifyWooSignature {
    rawBody: string;
    signature: string | null;
    secret: string | null;
}

function verifyWooSignature({ rawBody, signature, secret }: VerifyWooSignature): boolean {
    if (!signature || !secret) return false;

    const computed = crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("base64");

    try {
        return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(signature));
    } catch {
        return false; // length mismatch
    }
}

