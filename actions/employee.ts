'use server'

import dbConnect from "@/dbConnect"
import User from "@/models/userModel";
import { transformIdProperty } from "../lib/utils";
import { z } from "zod";

// Allowed email domains
const allowedEmailDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];

// Form schema for validating the form data
const formSchema = z.object({
    name: z.string({ message: "Name is required" }),
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

//function to get all employees
export async function getAllEmployees() {
    try {
        //connect to the database
        await dbConnect();

        //query the database for all employees
        const employees = await User.find({ role: { $ne: 'admin' } }).select(['_id', 'name', 'email', 'role', 'image']).lean();

        //return the employees
        if (employees && employees.length > 0) {
            return employees.map((employee) => transformIdProperty(employee));
        }

        return [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error.message);
    }
}

//function to update an employee
export async function updateEmployee(id: string, data: FormData) {
    const { name, email, role } = Object.fromEntries(data);
    const validatedFields = formSchema.safeParse({
        name,
        email,
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

        //query the database for the employee with the given id and update the employee
        const employee = await User.findByIdAndUpdate(id, { name, email, role }, { new: true })

        //return the employee
        if (employee) {
            return {
                status: 'success',
                message: 'Employee updated successfully',
            }
        }

        return {
            status: 'error',
            message: 'Employee not found',
            errors: {
                name: ['Employee not found'],
                email: ['Employee not found']
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
        console.log(error?.message)
        return {
            status: 'error',
            message: 'An error occurred',
            errors: {
                name: ['An error occurred'],
                email: ['An error occurred']
            }
        }
    }
}
