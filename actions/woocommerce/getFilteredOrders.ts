"use server";

import dbConnect from "@/dbConnect";
import Order from "@/models/orderModel";
import { OrderType } from "@/types/OrderType";

interface SearchParams {
    query?: string | string[];
    skip?: number;
    limit?: number;
    userId?: string;
    role?: string;
    page?: number;
}

async function getFilteredOrders(params: SearchParams) {
    const { query = '', skip = 0, limit = 10, userId, role, page = 1 } = params;

    try {
        await dbConnect();

        // Define search criteria
        const searchCriteria = {
            ...(role === 'admin' || role === 'clerk' ? {} : { asignee: userId }),
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { order_id: { $regex: query, $options: 'i' } },
                { phone: { $regex: query, $options: 'i' } },
                { city: { $regex: query, $options: 'i' } },
                { asignee_name: { $regex: query, $options: 'i' } }
            ],
        };

        // Fetch filtered orders and total count in parallel
        const [ordersResult, totalCount] = await Promise.all([
            Order.find(searchCriteria)
                .select('-_id -__v -createdAt -updatedAt -date_created_gmt -date_modified_gmt')
                .populate('asignee', ['name', 'image'])
                .limit(limit)
                .skip(skip)
                .sort({ date_created_gmt: -1 })
                .lean(),

            Order.countDocuments(searchCriteria),
        ]);

        // Format response
        const orders: OrderType[] = ordersResult.map((item) => ({
            order_id: item.order_id,
            name: item.name,
            city: item.city,
            address: item.address,
            phone: item.phone,
            payment: item.payment,
            amount: item.amount,
            status: item.status,
            asignee: {
                id: item.asignee?._id.toString(),
                name: item.asignee?.name,
                image: item.asignee?.image
            }
        }));

        // Calculate total pages
        const totalPages = Math.ceil(totalCount / limit);

        return {
            orders,
            totalPages,
            totalCount,
            currentPage: page
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log('Error in getFilteredOrders:', error?.message);
        return {
            orders: [],
            totalPages: 0,
            totalCount: 0,
            currentPage: page
        };
    }
}

export default getFilteredOrders;
