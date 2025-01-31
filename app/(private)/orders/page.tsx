import SearchField from "@/components/ui/SearchField"
import { SelectedOrderProvider } from "@/context/SelectedOrderCtx"
import { decodeSearchParams } from "@/lib/utils"
import { Suspense } from "react"
import UpdateOrderBtn from "./components/UpdateOrderBtn"
import OrdersTable from "./components/OrdersTable"
import SyncBtn from "./components/SyncBtn"
import FilterBtn from "./components/FilterBtn"
import CopyBtn from "./components/CopyBtn"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>


async function OrdersPage({ searchParams }: { searchParams: SearchParams }) {
    const { query, sort } = decodeSearchParams(await searchParams);

    return (
        <div className="py-8 flex flex-col flex-1 overflow-auto">
            <SelectedOrderProvider>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-2 items-center">
                        <SearchField className='w-80' />
                        <SyncBtn />
                    </div>
                    <div className="flex gap-2 items-center">
                        <CopyBtn />
                        <FilterBtn />
                        <UpdateOrderBtn />
                    </div>
                </div>
                <Suspense fallback={<div>Loading table data...</div>}>
                    <OrdersTable query={query} sort={sort} />
                </Suspense>
            </SelectedOrderProvider>
        </div>
    )
}

export default OrdersPage