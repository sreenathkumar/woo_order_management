'use client'

import { usePathname } from "next/navigation";
import { SidebarMenuButton } from "../shadcn/sidebar";

function NavItem({ text, children }: { text: string, children?: React.ReactNode }) {
    const path = usePathname();
    const isActive = path.includes(text.toLowerCase());

    return (
        <SidebarMenuButton tooltip={text} isActive={isActive}>
            {children}
            {text}
        </SidebarMenuButton>
    )
}

export default NavItem