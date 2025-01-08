'use server'

import { OrderType } from "@/types/OrderType";
import { prepareOrder, wooApi } from "./wooConfig"
import dbConnect from "@/dbConnect";
import Order from "@/models/orderModel";

const fetchOrders: ({ status }: { status: string }) => Promise<OrderType[]> = async ({ status }: { status: string }) => {
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

        console.log('allOrders: ', allOrders.length);

        return allOrders;
    } catch (error) {
        console.log(error)
        return [];
    }
}

const getAllOrders = async () => {

    try {
        await dbConnect();

        const dbOrders = await Order.find({}).select('-_id -__v');

        if (dbOrders.length === 0) {
            const fetchedData = await fetchOrders({ status: 'processing' });

            if (fetchedData.length > 0) {
                await Order.insertMany(fetchedData);
                return JSON.stringify(fetchedData);
            }
            return null;
        } else {
            return JSON.stringify(dbOrders);
        }
    } catch (error) {
        console.log(error);
        return null;
    }


};

export default getAllOrders