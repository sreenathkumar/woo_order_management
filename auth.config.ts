import { NextAuthConfig } from "next-auth";

export const authConfig = {
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60 // 7 days
    },
    providers: []
} satisfies NextAuthConfig