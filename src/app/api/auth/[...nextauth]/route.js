/* eslint-disable no-undef */
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectToDb from "@/lib/utils";
import { User } from "@/lib/models";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials"
import { authConfig } from "@/lib/auth.config";
const login = async (credentials) => {
    // console.log("inside login");

    try {
        await connectToDb();
        const user = await User.findOne({ username: credentials.username });
        // console.log(user);

        if (!user) {
            console.log("User not found");

            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
            console.log("Invalid password");

            throw new Error("Invalid password");
        }

        return user;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const authOptions = {
    ...authConfig,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,       
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;
                } catch (error) {
                    throw new Error(error.message);
                }
            }

        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token, user }) {
            return session;
        },
        async signIn({ account, profile, user }) {
            // console.log("User details:", user);
            // console.log("Account details:", account);
            if (account.provider === "github") {
                await connectToDb();

                try {
                    const existingUser = await User.findOne({ email: user.email });
                    if (!existingUser) {
                        const newUser = new User({
                            username: profile.login,
                            email: profile.email,
                            image: profile.avatar_url
                        })
                        await newUser.save();
                    }
                } catch (err) {
                    console.log(err);
                    return false;
                }
                return true;
            }
            if (account.provider === "google") {
                await connectToDb();

                try {
                    const existingUser = await User.findOne({ email: user.email });
                    if (!existingUser) {
                        const newUser = new User({
                            username: profile.name,
                            email: profile.email,
                            image: profile.picture
                        })
                        await newUser.save();
                    }
                } catch (err) {
                    console.log(err);
                    return false;
                }
                return true;
            }
            return true;
        },
        ...authConfig.callbacks,
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
