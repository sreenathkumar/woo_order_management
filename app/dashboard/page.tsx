import { auth } from "@/auth";

async function DashboardPage() {
    const session = await auth();

    if (!session) {
        return (
            <>
                <h1>Unauthorized</h1>
            </>
        )
    }

    const user = session.user;

    return (
        <>
        </>
    )
}

export default DashboardPage