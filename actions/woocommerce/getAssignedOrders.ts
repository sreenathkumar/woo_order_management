'use server'

import dbConnect from "@/dbConnect";
import Order from "@/models/orderModel";
import { unstable_cache } from "next/cache";

const getAssignedOrders = unstable_cache(async ({ id, status }: { id: string, status?: string }) => {

    if (!id) {
        return []
    }

    try {
        dbConnect();

        const filter = { asignee: id, ...(status ? { status: (status !== 'processing' ? { $ne: 'Processing' } : 'Processing') } : {}) };

        const orders = await Order.find(filter).select(['order_id', 'name', 'city', 'address', 'phone', 'payment', 'amount', 'status']);

        if (orders.length <= 0) {
            return []
        }

        return orders

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log('error in getAssignedOrders: ', error?.message);

        return []
    }
}, ['id', 'status'], { tags: ['assignedOrders'], revalidate: 3600 })

export default getAssignedOrders