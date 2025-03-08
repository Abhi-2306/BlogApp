"use server";
import { revalidatePath } from "next/cache";
import connectToDb from "./utils";
import { Post, User } from "./models";
import { signIn, signOut } from "next-auth/react";
import bcrypt from "bcryptjs";


export const addPost = async (prevState, formData) => {
    const { title, desc, slug, userId } = Object.fromEntries(formData);
    try {
        await connectToDb();
        const post = new Post({ title, desc, slug, userId });
        await post.save();
        console.log("saved to db");
        revalidatePath("/blog");
        revalidatePath("/admin")
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
    }
}

export const deletePost = async (formData) => {
    const { id } = Object.fromEntries(formData);
    try {
        await connectToDb();
        await Post.findByIdAndDelete(id);
        console.log("deleted from db");
        revalidatePath("/blog");
        revalidatePath("/admin");
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
    }
}
export const addUser = async (prevState, formData) => {
    const { username, email, password, img } = Object.fromEntries(formData);
    try {
        await connectToDb();

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user with the hashed password
        const newUser = new User({
            username,
            email,
            password: hashedPassword, // Store the hashed password
            img,
        });

        await newUser.save();
        console.log("User saved to DB");
        revalidatePath("/blog");
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
    }
};

export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData);
    try {
        await connectToDb();
        await Post.deleteMany({ userId: id });
        await User.findByIdAndDelete(id);
        console.log("deleted from db");
        revalidatePath("/admin");
        revalidatePath("/blog");
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
    }
}


// export const handleGoogleLogin = async () => {  
//     await signIn("google", { callbackUrl: "/" });
// };

export const handleLogout = async () => {
    if (typeof window !== 'undefined') {
        // Ensure this runs only in the client-side
        await signOut();
    }
};




