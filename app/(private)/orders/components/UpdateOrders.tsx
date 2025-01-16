'use client'

import { Button } from "@/components/shadcn/button"

import UpdateOptions from "../../employees/components/UpdateOptions"
import { useSelectedOrder } from "@/context/SelectedOrderCtx"
import OrderBadge from "./OrderBadge"
import { useState } from "react"
//import { useState } from 'react'

// Mock data for demonstration
const mockSelectedOrders = ['ORD-001', 'ORD-002', 'ORD-003']
const mockAssignees = ['John Doe', 'Jane Smith', 'Alice Johnson']
const mockStatuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled']

function UpdateOrders() {
    const { selectedOrder, setSelectedOrder } = useSelectedOrder();
    const [removedOrders, setRemovedOrders] = useState<string[]>([]);

    const removeOrder = (orderId: string) => {
        setSelectedOrder(selectedOrder.filter(id => id !== orderId));
        setRemovedOrders([...removedOrders, orderId]);
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="relative flex flex-col">
                <h3 className="text-lg font-medium">Selected Orders:</h3>
                <div className="flex gap-2 border rounded p-4">
                    {selectedOrder.length > 0 && selectedOrder.map(orderId => <OrderBadge key={orderId} onClose={() => removeOrder(orderId)}>{orderId} </OrderBadge>)
                    }
                </div>
                {
                    removedOrders.length > 0 && (
                        <div className="flex flex-col gap-2 border rounded p-4 absolute bottom-2 left-0 w-full">
                            {
                                removedOrders.map(orderId => <span key={orderId} className="">{orderId}</span>)
                            }
                        </div>
                    )
                }
            </div>
            <form className="space-y-6">
                <UpdateOptions options={mockAssignees} label="Assignee" id="assignee" placeholder="Select an assignee" />
                <UpdateOptions options={mockStatuses} label="Status" id="status" placeholder="Select a status" />

                <Button type="submit">Update Orders</Button>
            </form>
        </div>
    )
}

export default UpdateOrders