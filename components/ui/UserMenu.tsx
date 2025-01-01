'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/avatar";
import {
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/shadcn/dropdown-menu";
import {
    BadgeCheck,
    LogOut
} from "lucide-react";
import { useSidebar } from "../shadcn/sidebar";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function UserMenu({ userName, userEmail, userImage }: { userName: string, userEmail: string, userImage: string | undefined }) {
    const { isMobile } = useSidebar();
    const router = useRouter();

    const logout = async () => {
        try {
            await signOut();
            router.refresh();
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-popover"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
        >
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={userImage} alt={userName} />
                        <AvatarFallback className="rounded-lg bg-background">{userName[0].toLocaleUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{userName}</span>
                        <span className="truncate text-xs">{userEmail}</span>
                    </div>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
                <LogOut />
                Log out
            </DropdownMenuItem>
        </DropdownMenuContent>
    )
}

export default UserMenu