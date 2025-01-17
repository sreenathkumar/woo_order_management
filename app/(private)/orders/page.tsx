import { Button } from "@/components/shadcn/button"
import SearchField from "@/components/ui/SearchField"
import { SelectedOrderProvider } from "@/context/SelectedOrderCtx"
import { decodeSearchParams } from "@/lib/utils"
import { ListFilter } from "lucide-react"
import { Suspense } from "react"
import AssignOrderBtn from "./components/UpdateOrderBtn"
import OrdersTable from "./components/OrdersTable"
import SyncBtn from "./components/SyncBtn"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>


async function OrdersPage({ searchParams }: { searchParams: SearchParams }) {
    const { query } = decodeSearchParams(await searchParams);

    return (
        <div className="py-8 px-4 flex flex-col flex-1 overflow-auto">
            <SelectedOrderProvider>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-2 items-center">
                        <SearchField className='w-80' />
                        <SyncBtn />
                    </div>
                    <div className="flex gap-2 items-center">
                        <Button variant="outline" size="sm">
                            <ListFilter className="h-4 w-4" />
                            Filters
                        </Button>
                        <AssignOrderBtn />
                    </div>
                </div>
                <Suspense fallback={<div>Loading table data...</div>}>
                    <OrdersTable query={query} />
                </Suspense>
            </SelectedOrderProvider>
        </div>
    )
}

export default OrdersPage