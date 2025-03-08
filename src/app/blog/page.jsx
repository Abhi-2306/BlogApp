import React from "react";
import styles from "./blog.module.css";
import PostCard from "@/components/postCard/postCard";
import { getPosts } from "@/lib/data";

const getposts = async ()=>{
    // const response = await fetch("https://jsonplaceholder.typicode.com/posts",{cache:"no-store"});
    //use localhost:3000/api/blog for local
    const response = await fetch("http://localhost:3000/api/blog",{next:{revalidate:3600}});
    if(!response.ok){
      console.log("get all posts  ",response);
      throw new Error("Failed to fetch data");
    }
    return response.json();
}

export const metadata = {
  title: "Blog Page",
  description: "Blog Page Description",
};
const BlogPage = async () => {

  const posts = await getposts();
  // const posts = await getPosts();
  return (
    <div className={styles.container}>
      {
        posts?.map((post)=>(
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
        ))
      }
    </div>
  );
};

export default BlogPage;
