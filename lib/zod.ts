import { z } from "zod";

// signInSchema
export const signInSchema = z.object({
    email: z.string({ message: "Email is required" }),
    password: z.string({ message: "Password is required" }),
});

//update information schema
export const updateProfileSchema = z.object({
    name: z.string({ message: "Name is required" }),
    address: z.string({ message: "Address is required" }),
    phone: z.string({ message: "Phone number is required" }),
});

//woocommerce order schema for webhook
export const orderSchema = z.object({
    id: z.number({ message: "Order ID is required" }),
    total: z.string({ message: "Total amount is required" }),
    date_created: z.string(),
    billing: z.object({
        billing_phone_2: z.string({ message: "Phone number is required" }),
    }),
    payment_method: z.string({ message: "Payment method is required" }),
    date_created_gmt: z.string({ message: "Date created GMT is required" }),
    date_modified_gmt: z.string({ message: "Date modified GMT is required" }),
});
