import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/shadcn/sidebar"
import { type LucideIcon } from "lucide-react"
import Link from "next/link"

function MainNav
    ({
        items,
    }: {
        items: {
            title: string
            url: string
            icon?: LucideIcon
            isActive?: boolean
            items?: {
                title: string
                url: string
            }[]
        }[]
    }) {
    return (
        <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} >
                        {item.icon && <item.icon />}
                        <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}

export default MainNav
