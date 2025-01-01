
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger
} from "@/components/shadcn/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/shadcn/sidebar";

import UserMenu from "./UserMenu";

function UserAvatar({ userName, userEmail, userImage }: { userName: string, userEmail: string, userImage: string | undefined }) {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground data-[state=closed]:p-2"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={userImage} alt={userName} />
                                <AvatarFallback className="rounded-lg bg-background">{userName[0].toLocaleUpperCase() || "U"}</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{userName}</span>
                                <span className="truncate text-xs">{userEmail}</span>
                            </div>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <UserMenu userName={userName} userEmail={userEmail} userImage={userImage} />
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export default UserAvatar