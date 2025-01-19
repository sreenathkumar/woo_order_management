import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/avatar"
import { Button } from "@/components/shadcn/button"

function UserImage({ avatarUrl, handleAvatarChange }: any) {
    return (
        <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24">
                <AvatarImage src={avatarUrl} alt="User avatar" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="cursor-pointer text-xs px-3 py-2 h-auto">
                <label className="cursor-pointer">
                    Change Avatar
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleAvatarChange}
                    />
                </label>
            </Button>
        </div>
    )
}

export default UserImage