'use server'

import { OrderType } from "@/types/OrderType";
import { prepareOrder, wooApi } from "./wooConfig";
import Order from "@/models/orderModel";
import dbConnect from "@/dbConnect";

//let lastSyncTime = '';

//fetch orders from the woocommerce api
export const fetchOrders: ({ status }: { status?: string }) => Promise<OrderType[]> = async ({ status }: { status?: string }) => {
    try {
        const res = await wooApi.get('orders', { status });

        const totalPages = res.headers['x-wp-totalpages'];

        //remove unnecessary data and make it like OrderType
        const formatedOrder = res.data.map((order: unknown) => prepareOrder(order));
        let allOrders = [...formatedOrder];

        for (let i = 2; i <= parseInt(totalPages); i++) {
            const res = await wooApi.get('orders', { status, page: i });
            allOrders = [...allOrders, ...res.data.map((order: unknown) => prepareOrder(order))];
        }

        return allOrders;
    } catch (error) {
        console.log(error)
        return [];
    }
}

async function syncWithWoo() {
    try {
        //if there are no orders in the database, fetch them from the API
        const fetchedData = await fetchOrders({ status: 'processing' });
        if (fetchedData.length > 0) {
            await dbConnect();

            await Order.insertMany(fetchedData);

            return {
                status: 'success',
                message: 'Orders synced successfully',
            }
        }

        return {
            status: 'error',
            message: 'Error in fetching orders',
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
        console.log('error in syncWoo: ', error?.message);

        return {
            status: 'error',
            message: 'Error in syncing orders',
        }
    }

}

export default syncWithWoo