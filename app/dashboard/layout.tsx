import { auth } from '@/auth';
import { Sidebar } from '@/components/ui/Sidebar'
import { VerifyEmailNotice } from '@/components/ui/VerifyEmailNotice'
import React from 'react'

async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    if (!session) {
        return (
            <h1>Unauthorized</h1>
        )
    }

    const user = session.user;
    console.log('user: ', user);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-8">
                <VerifyEmailNotice email='test@gmail.com' />

                <div className="overflow-y-auto">
                    {children}
                </div>

            </main>
        </div>
    )
}

export default DashboardLayout