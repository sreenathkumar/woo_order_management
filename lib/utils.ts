import { type ClassValue, clsx } from "clsx"
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

//generate OTP verfication
export function generateOTP(length = 6) {
    const digits = '0123456789';
    let OTP = '';

    for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * digits.length)];
    }

    return OTP;
}

//==========================================
// transform the _id property to id string
//==========================================
interface TransformedObject {
    [key: string]: unknown; // Define a general structure for the object with key-value pairs
}

export function transformIdProperty(obj: Record<string, unknown>): TransformedObject {
    // Create an empty object to store the transformed object
    const transformedObj: TransformedObject = {};

    // Helper function to check if a value is a MongoDB ObjectId
    function isObjectId(value: unknown): boolean {
        return (
            mongoose.Types.ObjectId.isValid(value as string) &&
            String(new mongoose.Types.ObjectId(value as string)) === value?.toString()
        );
    }

    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            // Check if the key is '_id' and rename it to 'id'
            const newKey = key === "_id" ? "id" : key;

            // Convert the value to string if it is a valid ObjectId
            const value = isObjectId(obj[key]) ? String(obj[key]) : obj[key];

            // Assign the new key and transformed value to the transformed object
            transformedObj[newKey] = value;
        }
    }

    // Return the transformed object
    return transformedObj;
}

// ==========================================
// function which make the first letter of the string capital
// ==========================================
export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ==========================================
// parse the search params
// ==========================================
export function decodeSearchParams<T = Record<string, string | string[] | undefined>>(
    searchParams: Record<string, string | string[] | undefined>
): T {
    const decodedParams: Record<string, string | string[]> = {};

    // Iterate through the keys of the plain object and assign values to the decodedParams
    for (const key in searchParams) {
        if (searchParams[key] !== undefined) {
            decodedParams[key] = searchParams[key] as string | string[];
        }
    }

    return decodedParams as T;
}

export function convertToLocalTime(timeString: string) {
    if (!timeString) return ""; // Handle empty values

    // Handle 2-hour interval format: "2025-02-20 14:00"
    if (timeString.match(/^\d{1,2}(\.\d{2})?-\d{1,2}(\.\d{2})?$/)) {
        const [start, end] = timeString.split("-").map((t) => parseFloat(t));

        const formatHour = (hour: number) => {
            const period = hour >= 12 ? "PM" : "AM";
            const hour12 = hour % 12 === 0 ? 12 : hour % 12;
            return `${hour12}${period}`;
        };
        return `${formatHour(start)} - ${formatHour(end)}`;
    }

    // Handle day format: "2025-02-20"
    else if (timeString.match(/^\d{4}-\d{2}-\d{1,2}$/)) {
        const date = new Date(timeString + " UTC");
        return date.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" });
    }

    // Handle month format: "2025-02"
    else if (timeString.match(/^\d{4}-\d{2}$/)) {
        const [year, month] = timeString.split("-");
        const date = new Date(`${year}-${month}-01 UTC`);
        return date.toLocaleDateString([], { year: "numeric", month: "short" });
    }

    // Handle year format: "2025"
    else if (timeString.match(/^\d{4}$/)) {
        return timeString; // Year remains unchanged
    }

    return timeString; // Fallback for unexpected formats
}
