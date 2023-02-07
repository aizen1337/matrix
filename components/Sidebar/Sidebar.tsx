'use client'
import React, {useState} from 'react'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Sidebar.module.css';
import {TfiFacebook,TfiAlignJustify, TfiHome,TfiSearch,TfiPowerOff,TfiUser, TfiSettings} from 'react-icons/tfi'
import NavbarIcon from './NavbarIcon';
const Sidebar = () => { 
    const {data: session} = useSession();
    const [open,setOpen] = useState<Boolean>(false)
  return (
    <>
    <aside className={open ? `${styles.sidebar} ${styles.active}` : styles.sidebar}>
        <section className={styles.top}>
            <div className={styles.logo}>
                <TfiFacebook/>
                <span>
                    Fakelook
                </span>
            </div>
            <TfiAlignJustify className={styles.menu}  onClick={() => setOpen(!open)}/>
        </section>
        {session?.user && 
        <section className={styles.user}>
            <Link href={`/user/${session.user.email}`} style={{
                textDecoration: 'none'
            }}>
            <Image src={session.user?.image as string} width={50} height={50} alt="user avatar"/>
            <div>
                <p>
                    {session.user.name}
                </p>
            </div>
            </Link>
        </section>
        }
        <ul>
            <NavbarIcon icon={<TfiHome/>} name={'Home'} destination={'/'}/>
            <NavbarIcon icon={<TfiSearch/>} name={'Search'} destination={'#'}/>
            <NavbarIcon icon={<TfiUser/>} name={'Friends'} destination={'/friends'}/>
            <NavbarIcon icon={<TfiSettings/>} name={'Settings'} destination={'/settings'}/>
            <NavbarIcon icon={<TfiPowerOff/>} name={'Logout'} destination={'/login'}/>
        </ul>
    </aside>
    </>
  )
}

export default Sidebar