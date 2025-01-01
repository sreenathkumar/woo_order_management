import { Badge } from "@/components/shadcn/badge"
import { Checkbox } from "@/components/shadcn/checkbox"
import { TableCell, TableRow } from "@/components/shadcn/table"

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

function OrderRowItem({ order, children }: { order: Order, children: React.ReactNode }) {
    return (
        <TableRow>
            <TableCell>
                <Checkbox
                />
            </TableCell>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.name}</TableCell>
            <TableCell>{order.city}</TableCell>
            <TableCell>{order.city}</TableCell>
            <TableCell>{order.phone}</TableCell>
            <TableCell>{order.amount}</TableCell>
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
            <TableCell>{order.asignee}</TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end gap-4">
                    {children}
                </div>
            </TableCell>
        </TableRow>
    )
}

export default OrderRowItem