import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if it's an admin route
    if (pathname.startsWith("/admin")) {
        // Get the session token from cookies
        const sessionToken = request.cookies.get("better-auth.session_token");

        // If no session, redirect to login
        if (!sessionToken) {
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
