'use client'

import getAllOrders from "@/actions/woocommerce/getOrders";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/shadcn/table";
import { OrderType } from "@/types/OrderType";
import { useEffect, useState } from "react";
import OrderRowItem from "./OrderRowItem";
import TableHeadRowItem from "./TableHeadRowItem";


const tableColumns = ['Order Number', 'Name', 'City', 'Address', 'Phone Number', 'Amount', 'Status', 'Asignee', 'Actions'];

function OrdersTable() {
    const [initailOrders, setInitailOrders] = useState<OrderType[]>([]);

    const fetchData = async () => {
        const res: string | null = await getAllOrders();

        if (res) {
            setInitailOrders(JSON.parse(res));
        }
    }


    //fetch the orders from database when first load the page
    useEffect(() => {
        fetchData();
    }, [])

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
        <div className="border rounded-lg w-full overflow-x-auto">
            <Table className="border-collapse">
                <TableHeader>
                    <TableHeadRowItem columns={tableColumns} />
                </TableHeader>
                <TableBody>
                    {initailOrders.length > 0 ? initailOrders.map((order: OrderType) => (
                        <OrderRowItem
                            key={order.order_id}
                            order={order}
                        >
                            <button className="text-blue-500">Edit</button>
                            <button className="text-red-500">Delete</button>
                        </OrderRowItem>
                    )) : <TableRow><TableCell colSpan={tableColumns.length} className="text-center">No orders found</TableCell></TableRow>}
                </TableBody>
            </Table>
        </div>
    )
}

export default OrdersTable