// function which push the new order data to the DB whenever new order is placed in woocommerce
// also revalidate the path to show the updated data

import { prepareOrder } from "@/actions/woocommerce/wooConfig";
import { auth } from "@/auth";
import dbConnect from "@/dbConnect";
import Order from "@/models/orderModel";
import { OrderType } from "@/types/OrderType";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const listeners: Set<(data: any) => void> = new Set()


export async function POST(request: Request) {
    const session = auth();

    if (!session) {
        return new Response('Unauthorized', {
            status: 401,
        })
    }

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

            //send server side event to the client
            listeners.forEach(listener => listener(order))

            return new Response('Success!', {
                status: 200,
            })
        } else {
            return new Response('', {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function addListener(listener: (data: any) => void) {
    listeners.add(listener);

    return () => listeners.delete(listener)
}