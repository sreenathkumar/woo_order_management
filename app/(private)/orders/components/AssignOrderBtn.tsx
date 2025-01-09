'use client'

import { Button } from '@/components/shadcn/button'
import { useSelectedOrder } from '@/context/SelectedOrderCtx'

function AssignOrderBtn() {
    const { selectedOrder } = useSelectedOrder()
    return (
        <Button size="sm" disabled={selectedOrder?.length === 0}>
            Assign Order
        </Button>
    )
}

export default AssignOrderBtn