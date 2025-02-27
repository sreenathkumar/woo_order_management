// function which push the new order data to the DB whenever new order is placed in woocommerce
// also revalidate the path to show the updated data

import { prepareOrder } from "@/actions/woocommerce/wooConfig";
import dbConnect from "@/dbConnect";
import Order from "@/models/orderModel";
import { OrderType } from "@/types/OrderType";


export async function POST(request: Request) {
    try {
        const res = await request.json();

        if (res) {
            const order: OrderType | null = prepareOrder(res);

            if (!order) {
                return new Response('Order not created', {
                    status: 400,
                })
            }

            //connect to the database
            await dbConnect();

            //create a new order document in the database
            const newOrder = new Order(order);
            await newOrder.save();

            // Notify clients about the new order
            await fetch(`${process.env.BASE_URL}/api/webhook/updates`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "NEW_ORDER", order }),
            })

            return new Response('Success!', {
                status: 200,
            })
        } else {
            return new Response('Error in order_created webhook. Nothing getting from webhook.', {
                status: 400,
            })
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return new Response(`Webhook error: ${error.message}`, {
            status: 400,
        })
    }
}
