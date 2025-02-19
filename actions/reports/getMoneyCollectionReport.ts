'use server'

import dbConnect from "@/dbConnect";
import Order from "@/models/orderModel";


interface ReportTypeArgument {
    from?: Date | undefined, to?: Date | undefined, paymentType: string
}

type ReportReturnType = Promise<{
    assignee_id: string, assignee_name: string,
    assignee_image: string, total_amount: number, orders: string[]
}[]>


async function getReportByPaymentType({ paymentType }: ReportTypeArgument): ReportReturnType {
    if (!paymentType) return [];

    try {
        //connect database
        await dbConnect();

        //query the database for the money collection report
        const results = await Order.aggregate([
            {
                $match: {
                    status: paymentType,
                    date_delivered: { $gte: new Date("2025-01-13T06:03:34.000+00:00") }
                }
            },
            {
                $group: {
                    _id: "$asignee",
                    total_amount: {
                        $sum: {
                            $toDouble: "$amount"
                        }
                    },
                    orders: {
                        $push: "$order_id"
                    }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "asignee"
                }
            },
            {
                $unwind: { path: "$asignee" }
            },
            {
                $project: {
                    assignee_id: '$_id',
                    assignee_name: '$asignee.name',
                    assignee_image: '$asignee.image',
                    orders: 1,
                    total_amount: { $round: ['$total_amount', 2] },
                }
            }
        ]);

        if (results.length > 0) {

            const report = results.map((item, index) => {
                return {
                    assignee_id: item.assignee_id.toString(),
                    orders: item.orders,
                    total_amount: item.total_amount,
                    assignee_name: item.assignee_name,
                    assignee_image: item.assignee_image,
                    fill: `hsl(var(--chart-${index + 1}))`
                }
            })

            return report
        }

        return []
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log('Error in getting money collection report: ', error?.message);
        return [];
    }
}


export { getReportByPaymentType }