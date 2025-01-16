'use client'

import { getAllDrivers } from "@/actions/employee"
import { Button } from "@/components/shadcn/button"
import { useSelectedOrder } from "@/context/SelectedOrderCtx"
import { useEffect, useState } from "react"
import OrderBadge from "./OrderBadge"
import { AssigneeUpdateOptions, StatusUpdateOptions } from "./UpdateOptions"
import updateOrders from "@/actions/woocommerce/updateOrders"
import { useRouter } from "next/navigation"

export interface DriversType {
    id: string,
    name: string,
    image?: string
}

const statuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

function UpdateOrders() {
    const { selectedOrder, setSelectedOrder } = useSelectedOrder();
    const [removedOrders, setRemovedOrders] = useState<string[]>([]);
    const [drivers, setDrivers] = useState<DriversType[]>([]);
    const router = useRouter()

    const removeOrder = (orderId: string) => {
        setSelectedOrder(selectedOrder.filter(id => id !== orderId));
        setRemovedOrders([...removedOrders, orderId]);
    }

    //handle update order status
    const handleUpdateStatus = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedOrder.length > 0) {

            const formData = new FormData(e.currentTarget);
            const { assignee, status } = Object.fromEntries(formData);
            const assigneeName = drivers.find(driver => driver.id === String(assignee))?.name;

            if (assignee && status && assigneeName) {
                //update the orders
                const res = await updateOrders({ order_ids: selectedOrder, assignee: String(assignee), status: String(status), asignee_name: assigneeName });

                if (res && res.status === 'success') {
                    setSelectedOrder([]);
                    setRemovedOrders([]);

                    router.refresh();
                    console.log('res: ', res);
                }
            }
        }

    }

    //fetch the drivers
    const fetchDrivers = async () => {
        const res = await getAllDrivers();

        if (res && res.length > 0) {
            setDrivers([...res]);
        }
    }

    //update drivers on page load
    useEffect(() => {
        fetchDrivers();
    }, [])

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
            <form className="space-y-6" onSubmit={handleUpdateStatus}>
                <AssigneeUpdateOptions options={drivers} label="Assignee" id="assignee" placeholder="Select an assignee" />
                <StatusUpdateOptions options={statuses} label="Status" id="status" placeholder="Select a status" />

                <Button type="submit">Update Orders</Button>
            </form>
        </div>
    )
}

export default UpdateOrders