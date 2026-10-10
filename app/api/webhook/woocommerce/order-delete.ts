'use server'

import prisma from "@/lib/prisma";

export async function handleOrderDeleteEvent({ body, domain, shopId }: { body: any; domain: string; shopId: string }) {

    if (!body || !domain || !shopId) {
        throw new Error('Missing parameter to handle order delete event.');
    }

    //check if the order is out for delivery or delivered,
    const isDeliveryOrder = await prisma.order.findFirst({
        where: {
            shopId,
            order_id: body.order_id,
            status: {
                in: ['OUT_FOR_DELIVERY', 'DELIVERED']
            }
        }
    });

    if (isDeliveryOrder) {
        throw new Error('Cannot delete order that is out for delivery or already delivered.');
    }

    // Delete the order record from the database
    await prisma.order.deleteMany({
        where: {
            shopId,
            order_id: body.order_id
        }
    });

}