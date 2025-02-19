import OrdersChart from "./OrdersChart"
import AnalyticsCard from "./AnalyticsCard"
import LinkPaidChart from "./LinkPaidChart"
import { getReportByPaymentType } from "@/actions/reports/getMoneyCollectionReport"

const chartData = [
    { month: "January", orders: 186 },
    { month: "February", orders: 305 },
    { month: "March", orders: 237 },
    { month: "April", orders: 73 },
    { month: "May", orders: 209 },
    { month: "June", orders: 214 },
    { month: "July", orders: 73 },
    { month: "August", orders: 200 },
    { month: "September", orders: 204 },
    { month: "October", orders: 703 },
    { month: "November", orders: 9 },
    { month: "December", orders: 14 },
]


async function AdminDashboard() {
    const reports = await getReportByPaymentType({ paymentType: 'link_paid' });

    return (
        <div className="flex flex-1 flex-col gap-4 py-8">
            <AnalyticsCard title="Total Orders" chartKey="delivery">
                <OrdersChart chartData={chartData} />
            </AnalyticsCard>
            <div className="grid grid-cols-2 gap-4">
                <AnalyticsCard title="Link Paid" chartKey="link_paid">
                    <LinkPaidChart chartData={reports} />
                </AnalyticsCard>
                <AnalyticsCard title="Cash Paid" chartKey="cash_paid">
                    <OrdersChart chartData={chartData} />
                </AnalyticsCard>
            </div>
        </div>
    )
}

export default AdminDashboard