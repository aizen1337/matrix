import Link from 'next/link'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles.module.css';
const Navbar = () => {
  const {currentUser,login,logout,isAuth} = useContext(AuthContext)
  return (
    <nav className={styles.navbar}>
        <h1 className={styles.navtitle}>Radosław Rumian</h1>
        <ul className={styles.list}>
            {isAuth && (
            <>
            <Link className={styles.listElement} href="/">Home</Link>
            <Link className={styles.listElement} href="/experience">Experience</Link>
            <Link className={styles.listElement} href="/contact">Contact</Link>
            {!currentUser && <div onClick={login} className={styles.listElement}>Login</div>}
            {currentUser &&
            <div className="loggedIn">
            <p className={styles.userEmail}>{currentUser.email}</p>
            <div onClick={logout} className={styles.listElement}>Logout</div>
            </div> 
            }
            </>
            )
          }
        </ul>
    </nav>
  )
}

export default Navbar