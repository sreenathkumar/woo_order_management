'use server'

import dbConnect from "@/dbConnect";
import { saltAndHashPassword } from "@/lib/password";
import User from "@/models/userModel";
import { z } from "zod";

// Allowed email domains
const allowedEmailDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];


// Form schema for validating the form data
const formSchema = z.object({
    name: z.string({ message: "Name is required" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    email: z.string().email().refine((email) => {
        // Extract the domain from the email
        const domain = email.split('@')[1];
        // Check if the domain is in the allowed list
        return allowedEmailDomains.includes(domain);
    }, {
        message: 'Only Gmail, Yahoo, and Outlook emails are allowed.',
    }),
    role: z.string({ message: "Role is required" })
})

//function to register a user
const register = async (prevState: unknown, data: FormData) => {
    const { name, email, password, role } = Object.fromEntries(data);
    const validatedFields = formSchema.safeParse({
        name,
        email,
        password,
        role
    });


    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            status: 'error',
            message: "Invalid form data. Please check your inputs",
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    try {
        //connect to the database
        await dbConnect();

        //check if the user already exists
        const user = await User.findOne({ email });

        if (user) {
            return {
                status: 'error',
                errors: {
                    name: [],
                    email: ["An account with this email already exists"],
                    password: []
                },
                message: "Email already exists",
            }
        }

        const hashPassword = await saltAndHashPassword(password as string);
        const newUser = new User({ name, email, password: hashPassword, role });

        await newUser.save();

        //send success message
        return {
            status: 'success',
            message: "Employee registered successfully.",
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {

        return {
            status: 'error',
            message: error.message,
        }
    }
}

export default register;