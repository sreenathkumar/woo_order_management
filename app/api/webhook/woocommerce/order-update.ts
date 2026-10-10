'use server'

import prisma, { OrderStatus } from "@/lib/prisma";

interface WooOrderUpdatedEvent {
    body: any;
    domain: string;
    shopId: string;
}

export async function handleOrderUpdateEvent({ body, domain, shopId }: WooOrderUpdatedEvent) {
    if (!body || !domain || !shopId) {
        throw new Error('Missing parameter to handle order update event.');
    }


    if (body.order_id) {
        // Update the existing order record in the database
        await prisma.order.updateMany({
            where: { shopId: shopId, order_id: body.order_id },
            data: {
                name: body.name ?? '',
                city: body.city ?? '',
                address: body.address ?? '',
                phone: body.phone ?? '',
                payment: body.payment ?? '',
                amount: body.amount ?? 0,
                date_modified_gmt: body.date_modified_gmt ?? new Date(),
                status: mapWooStatus(body.status),
            },
        });
    }
}

function mapWooStatus(wooStatus: string): OrderStatus | undefined {
    switch (wooStatus) {
        case 'processing':
            return OrderStatus.PROCESSING;
        case 'cancelled':
            return OrderStatus.CANCELLED;
        case 'failed':
            return OrderStatus.FAILED;
        case 'on-hold':
            return OrderStatus.PROCESSING
        default:
            return undefined; // Default to processing if unknown status
    }
}