
const keyMapping: Record<string, string> = {
    order_id: "Order Number",
    name: "Name",
    city: "City",
    phone: "Phone Number",
    payment: "Payment",
    amount: "Amount",
    status: "Status",
    date_delivered: "Delivery Date",
    address: "Address",
}

export function generateClipboardText(obj: Record<string, unknown>, separator = "\n") {
    let text = "";
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const value = obj[key];

            if (value === null) continue;

            if (typeof value === "object") {
                // If the value is an object, convert it to a string
                text += `${keyMapping[key]}: ${JSON.stringify(value)}${separator}`;
            } else {
                text += `${keyMapping[key]}: ${value}${separator}`;
            }
        }
    }
    return text;
}
