// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        emailVerified?: Date | null;
        role?: string;
        image?: string;
    }

    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            emailVerified?: Date | null; // Add emailVerified to session user
            role?: string; // Add any other fields you might need
            image?: string;
        };
    }

    interface JWT {
        emailVerified?: Date | null; // Add emailVerified to the token
        role?: string;
        image?: string;
    }
}
