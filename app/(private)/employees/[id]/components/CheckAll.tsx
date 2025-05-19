'use client'

import { Checkbox } from "@/components/shadcn/checkbox";
import { useClipboardCopy } from "@/context/ClipboardCtx";
import { generateClipboardText } from "@/lib/clipboardText";
import { isSameArray } from "@/lib/utils";
import { OrderType } from "@/types/OrderType";
import { formatDate } from "date-fns";

function CheckAll({ status, orders }: { status?: 'processing' | 'delivered', orders: OrderType[] }) {
    const { clipboardContent, setClipboardContent, clearClipboard } = useClipboardCopy()

    //const parsedOrders = JSON.parse(orders);
    const ids = orders.map((order: OrderType) => order.order_id);
    let clipboardText = '';

    const isSame = isSameArray(ids, clipboardContent.ids)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    orders.forEach((order: any, index: number) => {
        const { date_delivered } = order;

        //check if the delivery date is there 
        if (date_delivered && date_delivered !== null) {
            order.date_delivered = formatDate(new Date(date_delivered), 'PPpp')
        } else {
            delete order.date_delivered;
        }

        if (clipboardText.length === 0) {
            clipboardText = generateClipboardText(order)
        } else {
            clipboardText += `${generateClipboardText(order)}${index !== orders.length && '\n\n'}`
        }

    })

    const handleCheck = () => {
        if (isSame) {
            clearClipboard()
        } else {
            setClipboardContent({
                text: clipboardText,
                ids: ids,
                status: status
            })
        }
    }

    return (
        <Checkbox onCheckedChange={handleCheck} checked={isSame} />
    )
}

export default CheckAll