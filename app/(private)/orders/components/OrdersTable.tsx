import { Table, TableBody, TableHeader } from "@/components/shadcn/table"
import OrderRowItem from "./OrderRowItem"
import TableHeadRowItem from "./TableHeadRowItem"

interface Order {
    id: string,
    name: string,
    city: string,
    address: string,
    phone: string,
    amount: string,
    status: string,
    asignee: string
}

interface OrdersTableProps {
    orders: Order[] | [],
    selectedOrders?: Order[] | [],
    setSelectedOrders?: (orders: Order[] | []) => void
}

const tableColumns = ['Order Number', 'Name', 'City', 'Address', 'Phone Number', 'Amount', 'Status', 'Asignee', 'Actions'];

function OrdersTable({ orders, }: OrdersTableProps) {
    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableHeadRowItem columns={tableColumns} />
                </TableHeader>
                <TableBody>
                    {orders.map((order: Order) => (
                        <OrderRowItem
                            key={order.id}
                            order={order}
                        >
                            <button className="text-blue-500">Edit</button>
                            <button className="text-red-500">Delete</button>
                        </OrderRowItem>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default OrdersTable