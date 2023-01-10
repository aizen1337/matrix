import Link from 'next/link'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles.module.css';
const Navbar = () => {
  const {currentUser,login} = useContext(AuthContext)
  return (
    <nav className={styles.navbar}>
        <h1 className={styles.navtitle}>Radosław Rumian</h1>
        <ul className={styles.list}>
            <Link className={styles.listElement} href="/">Home</Link>
            <Link className={styles.listElement} href="/experience">Experience</Link>
            <Link className={styles.listElement} href="/contact">Contact</Link>
            <div onClick={login} className={styles.listElement}>Login</div>
        </ul>
    </nav>
  )
}

export default Navbar