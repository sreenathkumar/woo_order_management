import { getServerSession } from "@/lib/auth-context";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false
    }
}

async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession();
    if (!session) {
        console.log("No active session found in org slug layout. Redirecting to login.");
        redirect('/login')
    };
    if (!session.user.emailVerified) {
        console.log("User email not verified. Redirecting to /email-verified.");
        redirect('/email-verified?error=NOT_VERIFIED');
    }
    return (
        <>
            {children}
        </>
    )
}

export default ProtectedLayout