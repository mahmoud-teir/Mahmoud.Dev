import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
    matcher: [
        // Match all pathnames except:
        // - API routes (/api)
        // - Static files (_next, favicon.ico, etc.)
        // - Admin routes (keep existing auth middleware for these)
        "/((?!api|_next|admin|login|.*\\..*).*)",
    ],
};
