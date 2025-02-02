'use server'

import dbConnect from "@/dbConnect";
import Order from "@/models/orderModel";

interface UpdateOrdertype {
    assignee?: string,
    assignee_name?: string,
    status?: string,
    order_ids: string[]
}

async function updateOrders({ assignee, assignee_name, status, order_ids }: UpdateOrdertype) {

    if (!order_ids || order_ids.length === 0) return {
        status: 'error',
        message: 'No orders selected'
    }

    try {
        //connect to the database
        await dbConnect();

        const updatedData = {
            asignee: assignee === 'none' ? null : assignee,
            asignee_name: assignee === 'none' ? '' : assignee_name,
            status: status,
            ...(status && ['delivered', 'link_paid', 'cash_paid'].includes(status) && { delivery_date: Date.now() })
        }

        //update the orders
        const orders = await Order.updateMany({
            order_id: { $in: order_ids }
        }, updatedData);

        //return the response
        if (orders.modifiedCount && orders.modifiedCount > 0) {
            return {
                status: 'success',
                message: 'Orders updated successfully',
            }
        }

        return {
            status: 'error',
            message: 'No orders updated'
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log('error in updating orders: ', error?.message);

        return {
            status: 'error',
            message: 'An error occurred'
        }
    }
}

export default updateOrders