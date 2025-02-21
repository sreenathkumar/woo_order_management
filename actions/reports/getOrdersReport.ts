'use server';

import dbConnect from '@/dbConnect';
import Order from '@/models/orderModel';
import { differenceInDays, subDays } from 'date-fns';

interface ReportTypeArgument {
    from?: string; //as UTC
    to?: string; // as UTC
}

async function getDeliveredOrderReport({ from, to }: ReportTypeArgument) {

    const { startDate, endDate } = getDateRange(from, to);
    if (!startDate || !endDate) return [];

    // Calculate time difference in days
    const difference = differenceInDays(new Date(endDate), new Date(startDate)) + 1;

    const groupStage = getGroupStage(difference);

    try {
        // Connect to database
        await dbConnect();

        // Query the database for delivered orders within the date range
        const result = await Order.aggregate([
            { $match: { date_created_gmt: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
            { $group: groupStage },
            { $sort: { _id: 1 } },
            {
                $project: {
                    _id: 0,
                    time: difference <= 1 ? {
                        $concat: [
                            { $toString: "$_id.hour" },
                            ".00-",
                            { $toString: { $add: ["$_id.hour", 2] } },
                            ".00"
                        ]
                    } : '$_id',
                    orders: '$count'
                }
            },
        ]);

        return result.length ? result : [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Error getting delivered order report:', error.message);
        return [];
    }
}

/**
 * Returns the start and end of a day in UTC format.
 */
function getDateRange(from?: string, to?: string) {

    if (!from && !to) {
        return {
            startDate: subDays(new Date(), Number(process.env.DEFAULT_DATE_INTERVAL) | 14).toISOString(),
            endDate: new Date().toISOString()
        }
    }

    if (from && !to) {
        return {
            startDate: `${from?.split('T')[0]}T00:00:00.000Z`,
            endDate: `${from.split('T')[0]}T23:59:59.999Z`
        }
    }

    if (to && !from) {
        const start = subDays(new Date(to), Number(process.env.DEFAULT_DATE_INTERVAL) | 14).toISOString()
        return {
            startDate: `${start?.split('T')[0]}T00:00:00.000Z`,
            endDate: `${to?.split('T')[0]}T23:59:59.999Z`
        }
    }

    return {
        startDate: from,
        endDate: to,
    };
}

/**
 * Returns MongoDB aggregation group stage based on the time difference.
 */
function getGroupStage(diff: number) {
    if (diff <= 1) {
        return {
            _id: {
                date: { $dateToString: { format: '%Y-%m-%d', date: '$date_created_gmt' } },
                hour: {
                    $multiply: [
                        { $floor: { $divide: [{ $hour: '$date_created_gmt' }, 2] } }, // Round down to 2-hour blocks
                        2,
                    ],
                },
            },
            count: { $sum: 1 },
        };
    } else if (diff <= 30) {
        return {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$date_created_gmt' } },
            count: { $sum: 1 },
        };
    } else if (diff <= 365) {
        return {
            _id: { $dateToString: { format: '%Y-%m', date: '$date_created_gmt' } },
            count: { $sum: 1 },
        };
    } else {
        return {
            _id: { $dateToString: { format: '%Y', date: '$date_created_gmt' } },
            count: { $sum: 1 },
        };
    }
}

export default getDeliveredOrderReport;
