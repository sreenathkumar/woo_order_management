import {
    differenceInDays, differenceInMonths, differenceInYears,
    format,
    isSameDay,
    subDays
} from "date-fns";

const DATE_INTERVAL = process.env.DEFAULT_DATE_INTERVAL || 14

export const getDateRangeText = (from: Date | undefined, to: Date | undefined) => {
    console.log('from and to inside getDateRange: ')
    let startDate: Date;
    let endDate: Date;

    if (from && !to) {
        startDate = from;
        endDate = from;
    } else if (to && !from) {
        startDate = subDays(to, Number(DATE_INTERVAL));
        endDate = to;
    } else if (from && to) {
        startDate = from;
        endDate = to;
    } else {
        // Handle the case where both are undefined
        startDate = subDays(new Date(), Number(DATE_INTERVAL));
        endDate = new Date();
    }

    const rangeText = formatDateRange(startDate, endDate); // Ensure this function is defined

    return { rangeText };
};


// Function to generate only the dynamic text (e.g., "last X days")
const formatDateRange = (startDate: Date, endDate: Date): string => {
    const today = new Date();
    const totalDays = differenceInDays(endDate, startDate) + 1; // Include both start & end dates
    const totalMonths = differenceInMonths(endDate, startDate);
    const totalYears = differenceInYears(endDate, startDate);

    // Case 1: If both dates are the same, return just the date or "today"
    if (isSameDay(startDate, endDate)) {
        return isSameDay(startDate, today)
            ? "today"
            : format(startDate, "MMMM d, yyyy");
    }

    // Case 2: Ranges
    if (totalDays <= 30) {
        return `last ${totalDays} days`;
    } else if (totalYears < 1) {
        const months = totalMonths;
        const days = totalDays - months * 30; // Approximate remaining days
        return `last ${months} month${months > 1 ? "s" : ""} ${days} day${days !== 1 ? "s" : ""}`;
    } else {
        const years = totalYears;
        const remainingMonths = totalMonths - years * 12;
        return `last ${years} year${years > 1 ? "s" : ""} ${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`;
    }
};


