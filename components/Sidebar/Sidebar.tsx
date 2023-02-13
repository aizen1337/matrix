'use client'
import React, {useState} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import styles from './Sidebar.module.css';
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import {TfiFacebook,TfiAlignJustify, TfiHome,TfiSearch,TfiPowerOff,TfiUser, TfiSettings} from 'react-icons/tfi'
import NavbarIcon from './NavbarIcon';
import { supabase } from '../../lib/supabase';
const Sidebar = () => { 
    const [open,setOpen] = useState<Boolean>(false)
    const logOut = async () => {
        console.log('logged out')
        const {error} = await supabase.auth.signOut()
        if (error) console.log(error)
    }
    const currentUser = useUser()
    console.log(currentUser)
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
        {currentUser && 
        <section className={styles.user}>
            <Link href={`/user/${currentUser.id}`} style={{
                textDecoration: 'none'
            }}>
            <Image src={currentUser.user_metadata?.avatar_url} width={50} height={50} alt="user avatar"/>
            <div>
                <p>
                    {currentUser.user_metadata?.name || currentUser.email}
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
            {currentUser ?
              <div onClick={() => logOut()}>
              <NavbarIcon icon={<TfiPowerOff/>} onClick={() => logOut()} name={'Logout'} />
              </div>
              :
              <NavbarIcon icon={<TfiPowerOff/>} name={'Login'} destination={'/login'}/>  
            }
        </ul>
    </aside>
    </>
  )
}

export default Sidebar