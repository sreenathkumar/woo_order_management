import { getUser } from "@/actions/user";
import { auth } from "@/auth";
import { Card, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { ClipboardProvider } from "@/context/ClipboardCtx";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import CopyOrders from "./components/CopyOrders";
import DeliveredTab from "./components/DeliveredTab";
import ProcessingTab from "./components/ProcessingTab";
import UserInfo from "./components/UserInfo";


type Props = {
    params: Promise<{ id: string }>
};

async function EmployeePage({ params }: Props) {
    const { id } = await params;
    const session = await auth();

    if (!session) {
        redirect('/login');
    }

    if (session.user?.role !== 'admin') {
        notFound();
    }

    if (session.user?.id === id) {
        redirect('/profile');
    }

    const user = await getUser({ userId: id });

    return (
        <div className="container mx-auto p-4 space-y-6 overflow-y-auto">
            <Card className="p-6 bg-transparent">
                <CardHeader className="p-0 mb-12">
                    <CardTitle>Employee Details</CardTitle>
                </CardHeader>
                <UserInfo user={user} />
            </Card>

            {user?.role === 'driver' && <Card className="p-6 bg-transparent">
                <CardHeader>
                    <CardTitle>Assigned Orders</CardTitle>
                </CardHeader>
                <div className="relative">
                    <ClipboardProvider>
                        <Tabs defaultValue="processing">
                            <TabsList>
                                <TabsTrigger value="processing">Processing</TabsTrigger>
                                <TabsTrigger value="delivered">Delivered</TabsTrigger>
                            </TabsList>
                            <TabsContent value="processing">
                                <Suspense fallback={<div>Loading assigned orders...</div>}>
                                    <ProcessingTab id={id} />
                                </Suspense>
                            </TabsContent>
                            <TabsContent value="delivered">
                                <Suspense fallback={<div>Loading assigned orders...</div>}>
                                    <DeliveredTab id={id} />
                                </Suspense>
                            </TabsContent>
                        </Tabs>
                        <CopyOrders />
                    </ClipboardProvider>
                </div>
            </Card>}
        </div>
    )
}

export default EmployeePage