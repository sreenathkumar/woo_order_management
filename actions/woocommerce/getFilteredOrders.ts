'use server'

import dbConnect from "@/dbConnect";
import Order from "@/models/orderModel";
import { OrderType } from "@/types/OrderType";

//params that can be passed in url to filter the orders
interface SearchParams {
    query?: string | string[];
    skip?: number;
    limit?: number;
}

/* function which will return the orders based on the search params
** we will use it to filter the orders using searchQuery, page,
** and filters like status, date, etc.
*/
async function getFilteredOrders(params: SearchParams) {
    const { query = '', skip = 0, limit = 10 } = params;

    try {
        await dbConnect();

        // Retrieve the orders from the database
        const result = await Order.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { order_id: { $regex: query, $options: 'i' } },
                { phone: { $regex: query, $options: 'i' } },
                { city: { $regex: query, $options: 'i' } },
                { asignee_name: { $regex: query, $options: 'i' } }
            ],
        })
            .select('-_id -__v -createdAt -updatedAt -date_created_gmt -date_modified_gmt')
            .limit(limit)
            .skip(skip)
            .lean()

        //Convert the result to OrderType for the server action response
        const dbOrders: OrderType[] = result.map((item) => {
            return {
                order_id: item.order_id,
                name: item.name,
                city: item.city,
                address: item.address,
                phone: item.phone,
                amount: item.amount,
                status: item.status,
                asignee: item.asignee
            }
        });

        if (dbOrders && dbOrders.length > 0) {
            return dbOrders;
        }

        return []

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log('error in filteredOrders: ', error?.message);
        return [];
    }
}

export default getFilteredOrders