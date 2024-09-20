
import Image from "next/image";
import React from "react";
import styles from "./about.module.css";

export const metadata = {
    title: "About Page",
    description: "About Page Description",
};

const AboutPage = () => {
    return (
    <div className={styles.container}>
        <div className={styles.textContainer}>
            <h2 className={styles.subtitle}>About Us</h2>
            <h1 className={styles.title}>
                We make your work a lot more interesting and exciting
            </h1>
            <p className={styles.desc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit, provident. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, quae. consectetur adipisicing elit.
            </p>
            <div className={styles.boxes}>
                <div className={styles.box}>
                    <h1>10+</h1>
                    <p>Years of experience</p>
                </div>
                <div className={styles.box}>
                    <h1>10+</h1>
                    <p>Years of experience</p>
                </div>
                <div className={styles.box}>
                    <h1>10+</h1>
                    <p>Years of experience</p>
                </div>
            </div>
        </div>
        <div className={styles.imgContainer}>
            <Image src="/about.png" alt="about" className={styles.img} fill/>
        </div>
    </div>);
};

export default AboutPage;
