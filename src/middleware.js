// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//     pages: {
//         signIn: '/login',
//     },
// });

// export const config = {
//     matcher: ["/admin/:path*", "/blog/:path*"],
// };

import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default withAuth(async (req) => {
    const token = await getToken({ req });

    // Check if the user is accessing the admin panel
    if (req.nextUrl.pathname.startsWith("/admin")) {
        // If no token or user is not admin, redirect to login
        if (!token || !token.isAdmin) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    // Check if the user is accessing the blog page
    if (req.nextUrl.pathname.startsWith("/blog")) {
        // If no token, redirect to login
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    // Allow access to all other routes
    return NextResponse.next();
}, {
    pages: {
        signIn: '/login',
    },
});

export const config = {
    matcher: ["/admin/:path*", "/blog/:path*"],
};
