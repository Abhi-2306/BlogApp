import React, { Suspense } from "react";
import styles from "./singlePost.module.css";
import Image from "next/image";
import PostUser from "@/components/postUser/postUser";

const getpost = async (slug)=>{
  const response = await fetch(`http://localhost:3000/api/blog/${slug}`);
  if(!response.ok){
    throw new Error("Failed to fetch data");
  }

  return response.json();
}


// eslint-disable-next-line react/prop-types

export const generateMetadata = async ({params}) => {
  const {slug} = params;

  // const post = await getPost(slug);
  const post = await getpost(slug);
  return {
    title: post.title,
    description: post.desc,
  };
}

const SinglePostPage = async({params}) => {
  // eslint-disable-next-line react/prop-types
  const {slug} = params;
  const post = await getpost(slug);
  // const post = await getPost(slug);
  return (
    <div className={styles.container}>
      {post.img && <div className={styles.imgContainer}>
        <Image src={post.img} alt="profile" fill className={styles.img}/>
      </div>}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post?.title}</h1>
        <div className={styles.detail}>
          {post && <Suspense fallback={<div>Loading...</div>}>
            <PostUser userId={post?.userId} />
          </Suspense>}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published Date</span>
            <span className={styles.detailValue}>{post.createdAt.toString().slice(4,16)}</span>
          </div>
        </div>
        <div className={styles.content}>
          {post?.desc}
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;

// import React, { Suspense } from "react";
// import styles from "./singlePost.module.css";
// import Image from "next/image";
// import PostUser from "@/components/postUser/postUser";
// import { getPost } from "@/lib/data";

// const getpost = async (slug)=>{
//       //use localhost:3000/api/blog for local
//   const response = await fetch(`https://blog-app-git-master-abhijiths-projects-7705a139.vercel.app/api/blog/${slug}`);
//   if(!response.ok){
//     console.log("getpost   ",response);
//     throw new Error("Failed to fetch data");
//   }

//   return response.json();
// }


// // eslint-disable-next-line react/prop-types

// export const generateMetadata = async ({params}) => {
//   const {slug} = params;

//   // const post = await getPost(slug);
//   const post = await getpost(slug);
//   return {
//     title: post.title,
//     description: post.desc,
//   };
// }

// const SinglePostPage = async({params}) => {
//   // eslint-disable-next-line react/prop-types
//   const {slug} = params;
//   const post = await getpost(slug);
//   // const post = await getPost(slug);
//   return (
//     <div className={styles.container}>
//       {post.img && <div className={styles.imgContainer}>
//         <Image src={post.img} alt="profile" fill className={styles.img}/>
//       </div>}
//       <div className={styles.textContainer}>
//         <h1 className={styles.title}>{post?.title}</h1>
//         <div className={styles.detail}>
//           {post && <Suspense fallback={<div>Loading...</div>}>
//             <PostUser userId={post?.userId} />
//           </Suspense>}
//           <div className={styles.detailText}>
//             <span className={styles.detailTitle}>Published Date</span>
//             <span className={styles.detailValue}>{post.createdAt.toString().slice(4,16)}</span>
//           </div>
//         </div>
//         <div className={styles.content}>
//           {post?.desc}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SinglePostPage;
