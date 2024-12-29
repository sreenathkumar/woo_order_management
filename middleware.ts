import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";

//pulic routes
const publicRoutes = ["/login", "/reset-password"];

//auth object without the mongodb adapter
const { auth } = NextAuth(authConfig);

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const session = await auth();

    if (!session && !publicRoutes.some((route) => path.startsWith(route))) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};