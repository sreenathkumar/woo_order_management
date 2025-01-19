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
})
