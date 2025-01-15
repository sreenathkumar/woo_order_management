'use client'


import { TableBody, TableCell, TableRow } from "@/components/shadcn/table";
import { OrderType } from "@/types/OrderType";
import { useEffect, useState } from "react";
import OrderRowItem from "./OrderRowItem";

function TableContent({ orders, columns }: { orders: OrderType[], columns: number }) {
    const [initailOrders, setInitailOrders] = useState<OrderType[]>(orders);

    //update UI when the orders prop changes
    useEffect(() => {
        setInitailOrders(orders);
    }, [orders]);

    //listen the updates from the woocommerce webhook
    useEffect(() => {
        const eventSource = new EventSource('/api/webhook/updates');
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('data: ', data);
        }

        return () => eventSource.close();
    }, []);

    return (
        <TableBody>
            {initailOrders.length > 0 ? initailOrders.map((order: OrderType) => (
                <OrderRowItem
                    key={order.order_id}
                    order={order}
                >
                    <button className="text-blue-500">Edit</button>
                    <button className="text-red-500">Delete</button>
                </OrderRowItem>
            )) : <TableRow><TableCell colSpan={columns} className="text-center">No orders found</TableCell></TableRow>}
        </TableBody>
    )
}

export default TableContent