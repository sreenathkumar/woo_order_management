'use server'

import dbConnect from "@/dbConnect";
import Location from "@/models/locationModel";
import Order from "@/models/orderModel";
import { OrderLocationType } from "@/types/OrderType";

export async function getAssignedOrderCoordinates(): Promise<OrderLocationType[]> {
    try {
        await dbConnect();

        const assignedOrders = await Order.find({
            asignee: { $ne: null },
            status: { $ne: 'delivered' }
        }).select('order_id city address asignee_name asignee').lean();

        const locations = await Location.find({
            city: { $in: assignedOrders.map(order => order.city) }
        });

        const orderCoordinates = assignedOrders.map(order => {

            const orderObj = {
                order_id: order.order_id as number,
                city: order.city as string,
                address: order.address as {
                    block?: string,
                    jaddah?: string,
                    street?: string,
                    house?: string,
                },
                asignee_name: order.asignee_name as string,
                asignee: order.asignee?.toString() as string,
                coordinates: null as { lat: number, lon: number } | null
            }

            if (locations.length > 0) {
                const location = locations.find(loc => loc.city === order.city);

                if (location && location[`block_${order?.address?.block}`]) {
                    return {
                        ...orderObj,
                        coordinates: location[`block_${order?.address?.block}`]
                    };
                }
            }
            return orderObj

        });

        return orderCoordinates;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log('Error in assignedOrderCoordinates: ', error.message);
        return [];
    }
}