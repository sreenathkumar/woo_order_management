'use client'

import { Button } from '@/components/shadcn/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/shadcn/dialog'
import { useSelectedOrder } from '@/context/SelectedOrderCtx'
import { DialogDescription } from '@radix-ui/react-dialog'
import UpdateOrders from './UpdateOrders'


function AssignOrderBtn() {
    const { selectedOrder } = useSelectedOrder();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" disabled={selectedOrder?.length === 0}>
                    Assign Order
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className='mb-4'>
                    <DialogTitle className="font-bold text-2xl">Update Selected Orders</DialogTitle>
                    <DialogDescription>Change the assignee and status for the selected orders.</DialogDescription>
                </DialogHeader>

                <UpdateOrders />
            </DialogContent>
        </Dialog>
    )
}

export default AssignOrderBtn