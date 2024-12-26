import { z } from "zod";

// signInSchema
export const signInSchema = z.object({
    email: z.string({ message: "Email is required" }),
    password: z.string({ message: "Password is required" }),
})
