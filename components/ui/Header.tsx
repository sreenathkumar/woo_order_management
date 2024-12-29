import { auth } from "@/auth";
import UserAvatar from "./UserAvatar";

async function Header() {
    const session = await auth();
    if (!session) {
        return null
    }
    const user = session.user

    return (
        <div className="flex justify-end items-center gap-6">
            <UserAvatar userName={user.name} userEmail={user.email} userImage={user.image} />
        </div>
    )
}

export default Header