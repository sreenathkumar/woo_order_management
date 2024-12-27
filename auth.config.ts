import { NextAuthConfig } from "next-auth";

export const authConfig = {
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60
    },
    providers: []
} satisfies NextAuthConfig