'use server'

import dbConnect from "@/dbConnect";
import User from "@/models/userModel";
import bcrypt from "bcrypt";

async function verifyUser({ email, password }: { email: string, password: string }) {
    await dbConnect();
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return null;
        }
        //compare the password
        const res = await bcrypt.compare(password, user?.password || "");

        if (res) {
            return {
                email: user?.email,
                name: user?.name,
                image: user?.image,
                emailVerified: user?.emailVerified
            };
        } else {
            return null;
        }
    } catch (error: unknown) {
        return null;
    }
};

export {
    verifyUser
}