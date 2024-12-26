'use server'

import dbConnect from "@/dbConnect";
import Token from "@/models/emailVerificationModel";
import User from "@/models/userModel";
import crypto from 'crypto';
import { sendVerificationEmail } from "./sendEmail";


export const verifyEmail = async (email: string, token: string) => {
    if (!email || !token) {
        return {
            status: 'error',
            message: "Invalid email or token",
        };
    }

    await dbConnect(); // Ensure the database connection is established

    // Create a session
    const session = await Token.startSession();

    try {
        session.startTransaction(); // Start the transaction immediately

        const user = await User.findOne({ email }).session(session);
        if (!user) {
            return {
                status: 'error',
                message: "There is no user with this email",
            };
        }

        if (user.emailVerified) {
            return {
                status: 'success',
                message: "Email is already verified",
            };
        }

        const isTokenFound = await Token.findOne({ userId: user._id, token }).session(session);
        //console.log('isTokenFound: ', isTokenFound);

        if (!isTokenFound) {
            return {
                status: 'error',
                message: "Invalid token",
            };
        }

        // Update the user's emailVerified field
        user.emailVerified = new Date();
        await user.save({ session });

        // Delete the token
        await Token.deleteOne({ userId: user._id }, { session });

        await session.commitTransaction(); // Commit the transaction

        return {
            status: 'success',
            message: "Email verified successfully",
        };

    } catch (error) {
        if (session) await session.abortTransaction(); // Roll back the transaction
        console.log('Error during verifying email: ', error);
        return {
            status: 'error',
            message: "An error occurred",
        };
    } finally {
        if (session) await session.endSession(); // End the session
    }
};


export const resendVerificationEmail = async (email: string) => {
    dbConnect();

    if (!email) {
        return {
            status: 'error',
            message: "Invalid email",
        };
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return {
                status: 'error',
                message: "There is no user with this email",
            };
        }

        const verificationToken = crypto.randomBytes(32).toString('hex');
        const token = await Token.findById(user?._id);
        const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}&email=${email}`;

        if (!token) {
            const newToken = new Token({ userId: user?._id, token: verificationToken });
            await newToken.save();

            const isEmailSent = await sendVerificationEmail(user.email, user.name, verificationLink);

            if (isEmailSent) {
                return {
                    status: 'success',
                    message: "Verfication email sent successfully. Check your email",
                };
            } else {
                return {
                    status: 'error',
                    message: "An error occurred while sending the verification email. Please try again later!",
                }
            }
        }

        token.token = verificationToken;

        await token.save();

        return {
            status: 'success',
            message: "Verification email sent successfully. Check your email",
        };

    } catch (error) {
        console.log('error during resending verification email: ', error);
        return {
            status: 'error',
            message: "An error occurred",
        };
    }
}