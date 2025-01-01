'use client'
import { Checkbox } from "@/components/shadcn/checkbox"
import { TableHead, TableRow } from "@/components/shadcn/table"

function TableHeadRowItem({ columns }: { columns: string[] }) {
    return (
        <TableRow>
            <TableHead>
                <Checkbox />
            </TableHead>
            {
                columns.map((column, index) => (
                    <TableHead key={column} className={`${index === columns.length - 1 ? "text-right" : ""}`} >{column}</TableHead>
                ))
            }
        </TableRow>
    )
}

export default TableHeadRowItem