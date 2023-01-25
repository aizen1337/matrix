'use client'
import Link from 'next/link'
import React from 'react'
import styles from '../styles/Styles.module.css';
import SearchBar from './SearchBar';
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <h1 className={styles.navtitle}>Fakelook</h1>
        <SearchBar/>
        <ul className={styles.list}>
            <Link className={styles.listElement} href="/">Home</Link>
            <Link className={styles.listElement} href="/posts">Blog</Link>
            <Link className={styles.listElement} href="/contact">Contact</Link>
        </ul>
    </nav>
  )
}

export default Navbar