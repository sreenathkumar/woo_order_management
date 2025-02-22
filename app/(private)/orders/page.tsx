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
                <div className="flex flex-col justify-between gap-4 mb-6 md:flex-row lg:items-center">
                    <div className="flex gap-2 justify-between items-center flex-1">
                        <SearchField className='max-w-80' />
                        <SyncBtn />
                    </div>
                    <div className="flex gap-2 items-center justify-between">
                        <CopyBtn />
                        <div className="flex gap-2 items-center justify-between flex-grow">
                            <FilterBtn />
                            <UpdateOrderBtn />
                        </div>
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