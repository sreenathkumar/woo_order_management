import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/shadcn/sidebar"
import { type LucideIcon } from "lucide-react"
import Link from "next/link"

interface MainNavProps {
    items: {
        title: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[],
}

function MainNav({ items }: MainNavProps) {
    return (
        <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <Link href={item.url}>
                        <SidebarMenuButton tooltip={item.title} >
                            {item.icon && <item.icon />}
                            {item.title}
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}

export default MainNav
