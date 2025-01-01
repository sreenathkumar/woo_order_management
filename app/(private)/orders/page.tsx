import SearchField from "@/components/ui/SearchField"
import OrdersTable from "./components/OrdersTable"
import { Button } from "@/components/shadcn/button"
import { ListFilter } from "lucide-react"

const orders = [
    {
        id: '12345',
        name: 'John Doe',
        city: 'New York',
        address: '123 Main St',
        phone: '123-456-7890',
        amount: '$100.00',
        status: 'Pending',
        asignee: 'John Doe'
    }
]

function OrdersPage() {
    return (
        <div className="py-8">
            <div className="flex justify-between items-center mb-6">
                <SearchField className='w-80' />
                <div className="flex gap-2 items-center">

                    <Button variant="outline" size="sm">
                        <ListFilter className="h-4 w-4" />
                        Filters
                    </Button>
                    <Button size="sm">
                        Assign Order
                    </Button>
                </div>
            </div>
            <OrdersTable orders={orders} />
        </div>
    )
}

export default OrdersPage