import { Card, CardHeader, CardTitle } from "@/components/shadcn/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs"
import UserInfo from "./components/UserInfo"
import { Suspense } from "react"
import AssignedOrders from "./components/AssignedOrders";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";

//table columns for the processing orders table
const processingTableColumns = ['Order Number', 'Name', 'City', 'Phone Number', 'Payment', 'Amount', 'Status'];

//table columns for the delivered orders table
const deliveredTableColumns = ['Order Number', 'Date', 'Status'];

async function EmployeePage({ params }: { params: { id: string } }) {
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



    return (
        <div className="container mx-auto p-4 space-y-6">
            <Card className="p-6 bg-transparent">
                <CardHeader className="p-0 mb-12">
                    <CardTitle>Employee Details</CardTitle>
                </CardHeader>
                <Suspense fallback={<div>Loading user info...</div>}>
                    <UserInfo id={id} />
                </Suspense>
            </Card>

            <Card className="p-6 bg-transparent">
                <CardHeader>
                    <CardTitle>Assigned Orders</CardTitle>
                </CardHeader>
                <Tabs defaultValue="processing">
                    <TabsList>
                        <TabsTrigger value="processing">Processing</TabsTrigger>
                        <TabsTrigger value="delivered">Delivered</TabsTrigger>
                    </TabsList>
                    <TabsContent value="processing">
                        <Suspense fallback={<div>Loading assigned orders...</div>}>
                            <AssignedOrders id={id} status="processing" tableColumns={processingTableColumns} />
                        </Suspense>
                    </TabsContent>
                    <TabsContent value="delivered">
                        <AssignedOrders id={id} status="delivered" tableColumns={deliveredTableColumns} />
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    )
}

export default EmployeePage