"use client";
import React from "react";
import Links from "./links/Links";
import styles from "./navbar.module.css";
import Link from "next/link";
import {  useSession } from "next-auth/react";
const Navbar = () => {
  const {data:session} = useSession();
  // console.log(session);
  return (
    <div className={styles.container}>
      <Link href={"/"} className={styles.logo}>AB</Link>
      <div>
        <Links session = {session}/>
      </div>
    </div>
  );
};

export default Navbar;
