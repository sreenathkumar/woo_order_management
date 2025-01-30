import { Table, TableHeader, } from "@/components/shadcn/table";
import TableHeadRowItem from "./TableHeadRowItem";
import TableContent from "./TableContent";
import { OrderType } from "@/types/OrderType";
import getOrders from "@/actions/woocommerce/getOrders";
import { auth } from "@/auth";
import { redirect } from "next/navigation";


const tableColumns = ['Order Number', 'Name', 'City', 'Address', 'Phone Number', 'Payment', 'Amount', 'Status', 'Asignee', 'Actions'];

async function OrdersTable({ query }: { query: string | string[] | undefined }) {
    const session = await auth();
    if (!session) {
        redirect('/login');
    }

    //get the user id from the session
    const userId = session?.user?.id
    const role = session?.user?.role

    const orders: OrderType[] = await getOrders({ query, userId, role });

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