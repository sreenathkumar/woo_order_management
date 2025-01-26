import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/shadcn/dropdown-menu"
import { ListFilter } from "lucide-react"

function FilterBtn() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 border h-9 px-3 rounded-md">
                <ListFilter className="h-4 w-4" />
                Filters
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>City (Asc) </DropdownMenuItem>
                <DropdownMenuItem>City (Desc)</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default FilterBtn