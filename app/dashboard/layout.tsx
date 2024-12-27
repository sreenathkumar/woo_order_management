import { auth } from '@/auth';
import Header from '@/components/ui/Header';
import { Sidebar } from '@/components/ui/Sidebar';
import { VerifyEmailNotice } from '@/components/ui/VerifyEmailNotice';
import React from 'react';

async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    console.log('session: ', session);

    if (!session) {
        return (
            <h1>Unauthorized</h1>
        )
    }

    const user = session.user;

    if (!user.emailVerified) {
        return (
            <EmailNotVerified email={user.email} />
        )
    }

    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 p-8">
                <Header />
                <div className="overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}

function EmailNotVerified({ email }: { email: string }) {
    return (
        <div className="flex h-screen">
            <main className="flex flex-1 p-8 justify-center items-center">
                <VerifyEmailNotice email={email} />
            </main>
        </div>
    )
}

export default DashboardLayout