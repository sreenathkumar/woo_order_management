'use server'

import dbConnect from "@/dbConnect";
import { saltAndHashPassword } from "@/lib/password";
import User from "@/models/userModel";
import { z } from "zod";
import crypto from 'crypto';
import Token from "@/models/emailVerificationModel";
import mongoose from "mongoose";
import { sendVerificationEmail } from "./sendEmail";

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
})

//function to register a user
const register = async (prevState: unknown, data: FormData) => {
    const { name, email, password } = Object.fromEntries(data);
    const validatedFields = formSchema.safeParse({
        name,
        email,
        password,
    });

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            status: 'error',
            message: "Invalid form data. Please check your inputs",
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

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

    //initializing the DB transaction to insure email verification token and user are saved together
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const hashPassword = await saltAndHashPassword(password as string);
        const newUser = new User({ name, email, password: hashPassword });


        //save the user
        const user = await newUser.save({ session });

        //create the email verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const token = new Token({ userId: user._id, token: verificationToken });

        //save the token
        await token.save({ session });

        //commit the transaction
        await session.commitTransaction();

        //send the verification email
        const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}&email=${email}`;

        const isSent = await sendVerificationEmail(email as string, name as string, verificationLink);

        if (!isSent) {
            if (session) await session.abortTransaction();
            return {
                status: 'error',
                message: "An error occurred while sending the verification email. Please try again later!",
            }
        }

        return {
            status: 'success',
            message: "User registered successfully. Please check your email to verify your account!",
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (session) await session.abortTransaction();
        return {
            status: 'error',
            message: error.message,
        }
    } finally {
        if (session) await session.endSession();
    }

}

export default register;