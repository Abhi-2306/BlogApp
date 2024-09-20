import React from 'react'
import styles from './footer.module.css'
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>AB</div>
      <div className={styles.text}>
        <p>Copyright © 2024. All rights reserved. </p>
      </div>
    </div>
  )
}

export default Footer
