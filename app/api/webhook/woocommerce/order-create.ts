'use server';

import prisma, { OrderStatus } from "@/lib/prisma";

interface WooOrderCreatedEvent {
    body: any;
    domain: string;
    shopId: string;
}

export async function handleCreateOrderEvent({ body, domain, shopId }: WooOrderCreatedEvent) {
    if (!body || !domain || !shopId) {
        throw new Error('Missing parameter to handle order creation event.');
    }

    // Create a new order record in the database
    await prisma.order.create({
        data: {
            shopId: shopId,
            shopDomain: domain,
            order_id: body.order_id,
            name: body.name ?? '',
            city: body.city ?? '',
            address: body.address ?? '',
            phone: body.phone ?? '',
            payment: body.payment ?? '',
            amount: body.amount ?? 0,
            date_created_gmt: body.date_created_gmt ?? new Date(),
            date_modified_gmt: body.date_modified_gmt ?? new Date(),
            status: OrderStatus.PROCESSING,
        },
    });

}