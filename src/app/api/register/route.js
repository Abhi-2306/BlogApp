import { User } from "@/lib/models";
import connectToDb from "@/lib/utils";
import bcrypt from "bcryptjs";
export async function POST(request) {
    const { username, email, password, passwordRepeat } = await request.json();

    if (password !== passwordRepeat) {
        return new Response(JSON.stringify({ error: "Passwords do not match" }), { status: 400 });
    }

    try {
        await connectToDb();
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return new Response(JSON.stringify({ error: "Username already exists" }), { status: 400 });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return new Response(JSON.stringify({ success: "Registration successful" }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Error occurred during registration" }), { status: 500 });
    }
}
