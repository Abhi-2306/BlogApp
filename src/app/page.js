import React from 'react';
import styles from './home.module.css';
import Image from 'next/image';
export default function Home() {
  
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>
          Creative Designs for the Modern Web
        </h1>
        <p className={styles.description}>
          Discover how to build a modern website with Next.js
        </p>
        <div className={styles.buttons}>
          <button className={styles.button}>Get Started</button>
          <button className={styles.button}>Learn More</button>
        </div>
        <div className={styles.brands}>
          <Image src = '/brands.png' className={styles.brandImg} alt="brands" fill/>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src = '/hero.gif' className={styles.heroImg} alt="brands" fill/>
      </div>
    </div>
  );
}




