import React from 'react'
import styles from "./postUser.module.css";
import { getUser } from '@/lib/data';
import Image from 'next/image';

// const getposts = async (userId)=>{
//     const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`,{cache:"no-store"});
//     if(!response.ok){
//         throw new Error("Failed to fetch data");
//     }
//     return response.json();
// }

// eslint-disable-next-line react/prop-types
const PostUser = async ({ userId }) => {
    // const user = await getposts(userId);
    const user = await getUser(userId);
    // console.log(user);
    return (
        <div className={styles.container}>
            <Image src={user.img ? user.img : "/noavatar.png"} height={50} width={50} alt="profile" className={styles.avatar} />
            <div className={styles.texts}>
                <span className={styles.title}>Author</span>
                <span className={styles.username}>{user.username}</span>
            </div>
        </div>
    )
}

export default PostUser
