'use client'

import { TableBody, TableCell, TableRow } from "@/components/shadcn/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/shadcn/dialog'
import { OrderType } from "@/types/OrderType";
import { useEffect, useState } from "react";
import OrderRowItem from "./OrderRowItem";
import { Button } from "@/components/shadcn/button";
import { useSelectedOrder } from "@/context/SelectedOrderCtx";
import UpdateOrders from "./UpdateOrders";

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
                    <EditOrderBtn order_id={order.order_id} />
                </OrderRowItem>
            )) : <TableRow><TableCell colSpan={columns} className="text-center">No orders found</TableCell></TableRow>}
        </TableBody>
    )
}

function EditOrderBtn({ order_id }: { order_id: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const { setSelectedOrder } = useSelectedOrder()

    //close the modal
    const closeModal = () => {
        if (isOpen) {
            setSelectedOrder([]);
        }
        setIsOpen(!isOpen)
    };


    return <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogTrigger asChild>
            <Button variant='link' onClick={() => setSelectedOrder([order_id])} >
                Edit
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader className='mb-4'>
                <DialogTitle className="font-bold text-2xl">Update Selected Orders</DialogTitle>
                <DialogDescription>Change the assignee and status for the selected orders.</DialogDescription>
            </DialogHeader>

            <UpdateOrders closeModal={closeModal} />
        </DialogContent>
    </Dialog>
}

export default TableContent