'use client'
import Link from 'next/link'
import React from 'react'
import styles from './Navbar.module.css';
import SearchBar from '../Sidebar/SearchBar';
import { signOut, useSession } from 'next-auth/react';
const Navbar = () => {
  const {data: session} = useSession();
  return (
    <nav className={styles.navbar}>
        <h1 className={styles.navtitle}>Fakelook</h1>
        <SearchBar/>       
        <ul className={styles.list}>
            <Link className={styles.listElement} href="/">Home</Link>
            <Link className={styles.listElement} href="/posts">Blog</Link>
        </ul>
        {session ? 
            <>
            <li className={styles.listElement}>
            <button  style={{
              backgroundColor: 'black'
            }} onClick={()=> signOut()}>Logout</button>
            <p>{session.user?.name}</p>
            </li>
            </> : 
            <Link className={styles.listElement} href="/login">Login</Link>
            }
    </nav>
  )
}

export default Navbar