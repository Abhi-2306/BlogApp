"use client";
import React, { useState, useEffect } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";
import { signOut } from "next-auth/react"; // Use signOut from next-auth directly
import { useRouter } from "next/navigation"; // Use next/navigation for Next.js 13

const links = [
    {
        title: "HomePage",
        path: "/",
    },
    {
        title: "About",
        path: "/about",
    },
    {
        title: "Contact",
        path: "/contact",
    },
    {
        title: "Blog",
        path: "/blog",
    },
];

const Links = ({ session }) => {
    const [open, setOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true); // Set mounted state to true after the component mounts
    }, []);

    const handleLogout = async () => {
        await signOut({
            callbackUrl: "/login", // Redirect to login after logout
        });
        router.push("/login");
    };

    if (!isMounted) return null; // Prevent rendering if the component isn't mounted yet

    return (
        <div>
            <div className={styles.links}>
                {links.map((link) => (
                    <NavLink item={link} key={link.title} />
                ))}
                {session?.user ? (
                    <>
                        {session.user?.isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
                        <button className={styles.logout} onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <NavLink item={{ title: "Login", path: "/login" }} />
                )}
            </div>

            {/* Mobile Menu */}
            <Image className={styles.menuButton} src="/menu.png" alt="menu" width={30} height={30} onClick={() => setOpen(!open)} />
            {open && (
                <div className={styles.mobileLinks}>
                    {links.map((link) => (
                        <NavLink item={link} key={link.title} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Links;
