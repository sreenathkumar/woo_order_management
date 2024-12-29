import { auth } from '@/auth';
import EmailNotVerified from '@/components/ui/EmailNotVerified';
import Header from '@/components/ui/Header';
import { Sidebar } from '@/components/ui/Sidebar';
import React from 'react'

async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    const user = session?.user;

    if (user && !user?.emailVerified) {
        return (
            <EmailNotVerified email={user.email} />
        )
    }

    return (
        <main className="flex h-screen">
            {user && <Sidebar />}
            <div className='flex-1 p-8'>
                <Header />
                <div className="overflow-y-auto">
                    {children}
                </div>
            </div>
        </main>
    )
}

export default DashboardLayout