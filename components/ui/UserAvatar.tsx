"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/avatar";
import { Button } from "@/components/shadcn/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function UserAvatar({ userName, userEmail, userImage }: { userName: string, userEmail: string, userImage: string | undefined }) {
    const router = useRouter()

    const logout = async () => {
        try {
            await signOut();
            router.refresh();
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={userImage} alt={userName} />
                        <AvatarFallback>{userName[0].toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {userEmail}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAvatar