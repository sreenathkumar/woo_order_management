'use server'

import dbConnect from "@/dbConnect";
import User from "@/models/userModel";
import { UserProfileType } from "@/types/UserType";

async function getUser({ userId }: { userId: string }) {
    //check if userId exist
    if (!userId) {
        null
    }

    try {
        //connect to the database
        await dbConnect();

        //query the database for the user with the given userId
        const user = await User.findOne({ email: userId }).select(['name', 'email', 'image', 'address', 'phone']);

        if (!user) {
            null
        }

        return {
            name: user.name,
            email: user.email,
            image: user.image,
            address: user.address,
            phone: user.phone
        }


        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log('error in getting user: ', error?.message);
        null
    }
}

async function updateProfile({ email, name, address, phone }: { email: string, name?: string, address?: string, phone?: string }) {
    const data = {
        name,
        address,
        phone
    }

    try {
        //connect database
        await dbConnect();

        //update the user
        const user = await User.findOneAndUpdate({ email }, { $set: data }, { new: true });

        if (!user) {
            return {
                status: 'error',
                message: "There is no user with this email",
            }
        }

        const updatedData: UserProfileType = {
            id: user._id.toString(),
            name: user.name,
            address: user.address,
            phone: user.phone,
            image: user.image,
            email: user.email
        }

        return {
            status: 'success',
            message: "Profile updated successfully",
            data: updatedData
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log('error in updating user: ', error?.message);
        return {
            status: 'error',
            message: error?.message,
        }
    }


}

export { getUser, updateProfile }