import { Button } from "@/components/shadcn/button"
import SearchField from "@/components/ui/SearchField"
import { ListFilter } from "lucide-react"
import { Suspense } from "react"
import OrdersTable from "./components/OrdersTable"
import { SelectedOrderProvider } from "@/context/SelectedOrderCtx"
import AssignOrderBtn from "./components/AssignOrderBtn"


async function OrdersPage() {

    return (
        <div className="py-8 px-4 flex flex-col flex-1 overflow-auto">
            <SelectedOrderProvider>
                <div className="flex justify-between items-center mb-6">
                    <SearchField className='w-80' />
                    <div className="flex gap-2 items-center">
                        <Button variant="outline" size="sm">
                            <ListFilter className="h-4 w-4" />
                            Filters
                        </Button>
                        <AssignOrderBtn />
                    </div>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <OrdersTable />
                </Suspense>
            </SelectedOrderProvider>
        </div>
    )
}

export default OrdersPage