'use server'

import dbConnect from "@/dbConnect";
import Order from "@/models/orderModel";
import getFilteredOrders from "./getFilteredOrders";
import User from "@/models/userModel";


//limit the number of orders for the db query result
const LIMIT = Number(process.env.ORDER_QUERY_LIMIT) || 10

interface SearchParams {
    query?: string | string[];
    page?: number;
    userId?: string;
    role?: string;
}


const getOrders = async (params: SearchParams = {}) => {
    const { query = '', page = 1, userId, role } = params;


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

            const searchCriteria = role === 'admin' || role === 'clerk' ? {} : { asignee: userId };

            //retrieve the orders from the database
            const dbOrders = await Order.find(searchCriteria)
                .select('-_id -__v -createdAt -updatedAt -date_created_gmt -date_modified_gmt')
                .populate('asignee', ['name', 'image'], User)
                .limit(LIMIT)
                .sort({ date_created_gmt: -1 })
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
                    payment: item.payment,
                    amount: item.amount,
                    status: item.status,
                    asignee: {
                        id: item.asignee?._id?.toString() || '',
                        name: item.asignee?.name,
                        image: item.asignee?.image
                    }
                }
            })

            if (orders.length > 0) {
                return orders
            }

        } else {
            //call the filtered orders function which will 
            //return the orders based on the search params
            const filteredOrders = await getFilteredOrders({ query: searchQuery, skip, limit: LIMIT, userId, role });

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

//return a single order data
export const getSingleOrder = async (order_id: string) => {
    if (!order_id) {
        return null;
    }
    try {
        await dbConnect();
        const order = await Order.findOne({ order_id })
            .select(['order_id', 'payment', 'status', 'asignee'])
            .populate('asignee', ['name', 'image'], User)

        return {
            order_id: order?.order_id,
            payment: order?.payment,
            status: order?.status,
            asignee: {
                id: order?.asignee?._id?.toString() || '',
                name: order?.asignee?.name,
                image: order?.asignee?.image
            }
        };
    } catch (error) {
        console.log('error in getSingleOrder: ', error);
        return null;
    }
}


export default getOrders