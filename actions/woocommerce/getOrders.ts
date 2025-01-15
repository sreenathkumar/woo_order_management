'use server'

import dbConnect from "@/dbConnect";
import Order from "@/models/orderModel";
import getFilteredOrders from "./getFilteredOrders";


//limit the number of orders for the db query result
const LIMIT = Number(process.env.ORDER_QUERY_LIMIT) || 10

interface SearchParams {
    query?: string | string[];
    page?: number;
}


const getAllOrders = async (params: SearchParams = {}) => {
    const { query = '', page = 1 } = params;


    // Calculate the number of documents to skip
    const skip = (page - 1) * LIMIT;

    let searchQuery: string = '';

    if (Array.isArray(query)) {
        searchQuery = query.join(' ');
    } else {
        searchQuery = query
    }

    try {
        /* If there are no orders in the database, fetch them from the API
        ** then insert them into the database
        ** and return them as server action response
        */
        if (!searchQuery) {
            await dbConnect();

            //retrieve the orders from the database
            const dbOrders = await Order.find({})
                .select('-_id -__v -createdAt -updatedAt -date_created_gmt -date_modified_gmt')
                .limit(LIMIT)
                .skip(skip)
                .lean();

            //eliminate the extra data returned from the woo api
            const orders = dbOrders.map((item) => {
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
            })

            if (orders.length > 0) {
                return orders
            }

        } else {
            //call the filtered orders function which will 
            //return the orders based on the search params
            const filteredOrders = await getFilteredOrders({ query: searchQuery, skip, limit: LIMIT });

            if (filteredOrders.length > 0) {
                return filteredOrders
            }
        }
        return [];
    } catch (error) {
        console.log('error in getAllOrders: ', error);
        return [];
    }
}


export default getAllOrders