"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, HelpCircle } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/shadcn/button"

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Employees", href: "/dashboard/documents", icon: FileText },
    { name: "Orders", href: "/dashboard/orders", icon: FileText },
    { name: "Help", href: "/dashboard/help", icon: HelpCircle },
]

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 h-full border-r">
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-center h-16 border-b">
                    <span className="text-2xl font-bold">Logo</span>
                </div>
                <nav className="flex-1 overflow-y-auto py-4">
                    {navItems.map((item) => (
                        <Link key={item.name} href={item.href}>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start gap-2 px-4"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Button>
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    )
}

