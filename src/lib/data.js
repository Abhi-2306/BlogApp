
// const users = [
//     {
//         name: "John",
//         id: 1,
//     },
//     {
//         name: "Mike",
//         id: 2,
//     },
//     {
//         name: "Jane",
//         id: 3,
//     },
// ];

import { unstable_noStore } from "next/cache";
import { Post, User } from "./models";
import connectToDb from "./utils";

// const posts = [
//     {
//         id: 1,
//         title: "post1",
//         body: "post1 body",
//         userId: 1,
//     },
//     {
//         id: 2,
//         title: "post2",
//         body: "post2 body",
//         userId: 2,
//     },
//     {
//         id: 3,
//         title: "post3",
//         body: "post3 body",
//         userId: 3,
//     },
//     {
//         id: 4,
//         title: "post4",
//         body: "post4 body",
//         userId: 1,
//     },
//     {
//         id: 5,
//         title: "post5",
//         body: "post5 body",
//         userId: 2,
//     },
// ];

export const getPosts = async () => {
    try {
        await connectToDb();
        const posts = await Post.find();
        return posts;

    } catch (error) {
        console.log("Failed to fetch posts ", error);
        throw new Error(error);

    }
};
export const getUsers = async () => {
    try {
        await connectToDb();
        const users = await User.find();
        return users;

    } catch (error) {
        console.log("Failed to fetch users ", error);
        throw new Error(error);

    }
};

export const getPost = async (slug) => {
    try {
        await connectToDb();
        const post = await Post.findOne({slug});
        return post;
    } catch (error) {
        console.log("Failed to fetch post ", error);
        throw new Error(error);
    }
};
export const getUser = async (id) => {
    unstable_noStore()
    try {
        await connectToDb();
        const users = await User.findById(id);
        return users;
    } catch (error) {
        console.log("Failed to fetch user ", error);
        throw new Error(error);
    }

};
