import getAssignedOrders from "@/actions/woocommerce/getAssignedOrders";
import { Badge } from "@/components/shadcn/badge";
import { CardContent } from "@/components/shadcn/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/table"


async function AssignedOrders({ id, status, tableColumns }: { id: string, status?: string, tableColumns: string[] }) {
    const orders = await getAssignedOrders({ id, status });
    console.log(orders);
    return (
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        {
                            tableColumns?.map((column) => (
                                <TableHead key={column}>{column}</TableHead>
                            ))
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        orders.length === 0 ? <TableRow><TableCell colSpan={tableColumns.length} className="text-center text-red-500">No orders found</TableCell></TableRow> :
                            orders.map((order) => (
                                <TableRow key={order.order_id}>
                                    <TableCell className="font-medium">{order.order_id}</TableCell>
                                    <TableCell>{order.name}</TableCell>
                                    <TableCell>{order.city}</TableCell>
                                    <TableCell>{order.phone}</TableCell>
                                    <TableCell>{order.payment === 'hesabe' ? 'PAID' : 'Cash On Delivery'}</TableCell>
                                    <TableCell>{order.payment === 'hesabe' ? 'N/A' : order.amount}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={order.status === 'completed' ? 'success' : 'warning'}
                                            className={
                                                order.status === 'completed'
                                                    ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                                            }
                                        >
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                </TableBody>
            </Table>
        </CardContent>
    )
}

export default AssignedOrders