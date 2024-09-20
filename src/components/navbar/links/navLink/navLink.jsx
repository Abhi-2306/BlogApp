
"use client";
import React from "react";
import styles from "./navLink.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
const NavLink = ({ item }) => {
    const pathName = usePathname();
    // console.log(pathName);
    return (
    <Link href={item.path} className={`${styles.container} ${pathName === item.path && styles.active}`}>
        {item.title}
    </Link>
    );
};

export default NavLink;
