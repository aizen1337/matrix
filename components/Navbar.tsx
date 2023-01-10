import Link from 'next/link'
import React from 'react'
import styles from '../styles/Styles.module.css';
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <h1 className={styles.navtitle}>Radosław Rumian</h1>
        <ul className={styles.list}>
            <Link className={styles.listElement} href="/">Home</Link>
            <Link className={styles.listElement} href="/experience">Experience</Link>
            <Link className={styles.listElement} href="/contact">Contact</Link>
            <a className={styles.listElement}>Login</a>
        </ul>
    </nav>
  )
}

export default Navbar