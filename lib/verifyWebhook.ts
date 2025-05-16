import crypto from "crypto";

async function verifySignature(req: Request, secret?: string
): Promise<boolean> {
    const signature = req?.headers?.get('X-WC-Webhook-Signature') || '';

    if (!signature) {
        console.log('No signature provided');
        return false;
    }

    if (!secret) {
        console.log('Webhook secret is not defined');
        return false;
    }

    const cloned = req.clone();
    const rawBody = await cloned.text();

    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(rawBody, 'utf8')
        .digest('base64');

    // Check if the signature is valid
    const isValid = crypto.timingSafeEqual(
        Buffer.from(signature, 'base64'),
        Buffer.from(expectedSignature, 'base64')
    );

    return isValid;
}

export default verifySignature;