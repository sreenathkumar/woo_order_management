import { auth } from "@/auth";
import SearchOrder from "./SearchOrder"
import UserAvatar from "./UserAvatar";

async function Header() {
    const session = await auth();
    if (!session) {
        return null
    }
    const user = session.user

    return (
        <div className="flex justify-between items-center gap-6">
            <SearchOrder />
            <UserAvatar userName={user.name} userEmail={user.email} userImage={user.image} />
        </div>
    )
}

export default Header