import { OrderType } from "@/types/OrderType";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export const wooApi = new WooCommerceRestApi({
    url: process.env.WOO_API_URI || "",
    consumerKey: process.env.WOO_KEY || "",
    consumerSecret: process.env.WOO_SECRET || "",
    version: "wc/v3"
});

interface ExtendedOrderType extends OrderType {
    date_created_gmt: string;
    date_modified_gmt: string;
}

type MetaDataItem = {
    id: number;
    key: string;
    value: string | object; // Adjust type based on possible values
};

type BillingData = {
    _billing_block?: string;
    _billing_street?: string;
    _billing_house?: string;
    _billing_jaddah?: string;
    _billing_floor_apt?: string;
    _billing_phone_2?: string;
};

// List of keys to extract
const keysToExtract: (keyof BillingData)[] = [
    "_billing_block",
    "_billing_street",
    "_billing_house",
    "_billing_jaddah",
    "_billing_floor_apt",
    "_billing_phone_2",
];



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prepareOrder = (order: any) => {
    if (!order) return null;

    const { id, total, billing: { first_name, state }, payment_method, date_created_gmt, date_modified_gmt, meta_data } = order;

    // Extract the desired data
    const billingData: BillingData = meta_data
        .filter((item: MetaDataItem) => keysToExtract.includes(item.key as keyof BillingData))
        .reduce((acc: BillingData, item: MetaDataItem) => {
            acc[item.key as keyof BillingData] = item.value as string; // Type assertion to match BillingData
            return acc;
        }, {});

    return {
        order_id: id || '',
        amount: total || '',
        name: first_name || '',
        city: state || '',
        address: {
            block: billingData._billing_block || '',
            street: billingData._billing_street || '',
            house: billingData._billing_house || '',
            jaddah: billingData._billing_jaddah || '',
            floor_apt: billingData._billing_floor_apt || '',
        },
        phone: billingData._billing_phone_2 || '',
        payment: payment_method || '',
        date_created_gmt: date_created_gmt || '',
        date_modified_gmt: date_modified_gmt || '',
        status: 'Processing',
        asignee: null,
    } satisfies ExtendedOrderType

}