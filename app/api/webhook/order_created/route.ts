// function which push the new order data to the DB whenever new order is placed in woocommerce
// also revalidate the path to show the updated data

import { prepareOrder } from "@/actions/woocommerce/wooConfig";
import dbConnect from "@/dbConnect";
import verifySignature from "@/lib/verifyWebhook";
import { orderSchema } from "@/lib/zod";
import Order from "@/models/orderModel";
import { OrderType } from "@/types/OrderType";


export async function POST(request: Request) {
    try {
        const isAuthenticated = await verifySignature(request, process.env.OC_WC_WEBHOOK);

        if (!isAuthenticated) {
            console.error('Webhook authentication failed');
            return new Response('Webhook unauthenticated', {
                status: 200,
            })
        }

        const res = await request.json();

        if (res) {
            //validate the order data
            const { error } = orderSchema.safeParse(res);

            if (error) {
                console.error('Order validation error:', error.errors);
                return new Response('Invalid order data', {
                    status: 200,
                })
            }
            const order: OrderType | null = prepareOrder(res);

            if (!order) {
                return new Response('Order not created', {
                    status: 200,
                })
            }

            //connect to the database
            await dbConnect();

            //check if the order already exists in the database
            const existingOrder = await Order.findOne({ order_id: order.order_id });
            if (existingOrder) {
                return new Response('Order already exists', {
                    status: 200,
                })
            }

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
        console.log('Something error in order_created webhook: ', error.message);
        return new Response(`Webhook error: ${error.message}`, {
            status: 400,
        })
    }
}
