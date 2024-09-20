// export const authConfig = {
//     pages: {
//         signIn: "/login",
//     },
//     providers: [],
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 token.id = user.id;
//                 token.isAdmin = user.isAdmin;
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             if (token) {
//                 session.user.id = token.id;
//                 session.user.isAdmin = token.isAdmin;
//             }
//             return session;
//         },
//         authorized({ auth, request }) {
//             const user = auth?.user;
//             const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
//             const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
//             const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");


//             if (isOnAdminPanel) {
//                 if (!user || !user.isAdmin) {
//                     return false;
//                 }
//             }


//             if (isOnBlogPage && !user) {

//                 return false;
//             }

//             if (isOnLoginPage && user) {
//                 return Response.redirect(new URL("/", request.nextUrl));
//             }

//             return true
//         },
//     },
// };

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    providers: [],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.isAdmin = user.isAdmin;

            }
            return token;
        },
        async session({ session, token }) {
            console.log("inside session",token);
            console.log("inside session",session);
            if (token) {
                session.user.id = token.id;
                session.user.isAdmin = token.isAdmin;

            }
            return session;
        },
        async authorized({ auth, request }) {
            const user = auth?.user;
            console.log("inside authorized",user);
            const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
            const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
            const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
            // Only admin users can access the admin panel
            if (isOnAdminPanel && (!user || !user.isAdmin)) {
                return false;
            }

            // Only authenticated users can access the blog page
            if (isOnBlogPage && !user) {
                return false; // Deny access
            }

            // Only unauthenticated users can access the login page
            if (isOnLoginPage && user) {
                return Response.redirect(new URL("/", request.nextUrl)); // Redirect to home
            }

            return true; // Allow access for all other cases
        },
    },
};
