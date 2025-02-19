import {
    subDays, subMonths, subYears, isValid, parseISO,
    differenceInDays, differenceInMonths, differenceInYears,
    isSameDay, format
} from "date-fns";

type Period = "30d" | "2m" | "1y";

interface DateRange {
    startDate: Date;
    endDate: Date;
    rangeText: string; // Only the dynamic part (e.g., "last 30 days")
}

const getDateRange = (from: string | null, to: string | null, defaultPeriod: Period = "30d"): DateRange => {
    let startDate: Date;
    const endDate: Date = to ? parseISO(to) : new Date(); // Default to today if 'to' is missing

    // Validate 'from' date
    if (from) {
        const parsedFrom = parseISO(from);
        startDate = isValid(parsedFrom) ? parsedFrom : calculateDefaultStartDate(defaultPeriod);
    } else {
        startDate = calculateDefaultStartDate(defaultPeriod);
    }

    const rangeText = formatDateRange(startDate, endDate); // Only returns the dynamic part
    return { startDate, endDate, rangeText };
};

// Helper function to calculate default start date based on a predefined period
const calculateDefaultStartDate = (period: Period): Date => {
    const today = new Date();
    switch (period) {
        case "30d":
            return subDays(today, 30);
        case "2m":
            return subMonths(today, 2);
        case "1y":
            return subYears(today, 1);
        default:
            return subDays(today, 14); // Default to last 15 days
    }
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

export { getDateRange };
