import { Table, TableHeader, } from "@/components/shadcn/table";
import TableHeadRowItem from "./TableHeadRowItem";
import TableContent from "./TableContent";
import { OrderType } from "@/types/OrderType";
import getAllOrders from "@/actions/woocommerce/getOrders";


const tableColumns = ['Order Number', 'Name', 'City', 'Address', 'Phone Number', 'Amount', 'Status', 'Asignee', 'Actions'];

async function OrdersTable({ query }: { query: string | string[] | undefined }) {
    const orders: OrderType[] = await getAllOrders({ query });

    return (
        <div className="border rounded-lg w-full overflow-x-auto">
            <Table className="border-collapse">
                <TableHeader>
                    <TableHeadRowItem columns={tableColumns} orderIds={orders.map(order => order.order_id)} />
                </TableHeader>
                <TableContent columns={tableColumns.length} orders={orders} />
            </Table>
        </div>
    )
}

export default OrdersTable