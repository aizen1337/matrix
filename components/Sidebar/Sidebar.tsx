import React, { useState} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Sidebar.module.css';
import {useUser } from '@supabase/auth-helpers-react'
import {TfiImage, TfiHome,TfiSearch,TfiPowerOff,TfiUser,TfiPlus, TfiSave, TfiMenu, TfiComments} from 'react-icons/tfi'
import {FcGoogle} from 'react-icons/fc'
import Icon from './Icon';
import { supabase } from '../../lib/supabase';
import {Drawer, notification} from 'antd';
import FriendsDrawer from './FriendsDrawer';
import SearchDrawer from './SearchDrawer';
import {HiOutlineBell} from 'react-icons/hi' 
import NotificationsDrawer from './NotificationsDrawer';
import BottomBar from './BottomBar';
const Sidebar = () => { 
    const router = useRouter()
    const [open,setOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false);
    const [friendsDrawerOpen,setFriendsDrawerOpen] = useState(false)
    const [notificationsDrawerOpen, setNotificationsDrawerOpen] = useState(false)
    const [notificationCounter, setNotificationCounter] = useState(0)
    const currentUser = useUser()
    const logoutHandler = async () => {
        notification.open({
            message: 'You have been logged out',
          });
          await supabase.auth.signOut()
          router.push('/')
    }
    const googleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
          })
        if (error) console.log(error)
    }
  return (
    <>
    <TfiMenu className={styles.menu} id="menu" onClick={() => setOpen(!open)}/>
    <Drawer open={open} onClose={() => setOpen(false)} className={styles.sidebar} placement='left' style={{background: '#262626'}}>
        <section className={styles.top}>
            <Link href={"/"} style={{
                textDecoration: 'none',
                cursor: 'pointer'
            }} className={styles.logo}>
                <TfiImage/>
                <span>
                    Matrix
                </span>
            </Link>
        </section>
        {currentUser && 
        <Link href={`/account/${currentUser.id}`} style={{
        textDecoration: 'none'
        }}>
        <section className={styles.user}>
            <Image src={currentUser.user_metadata?.avatar_url} width={50} height={50} alt="user avatar"/>
            <div>
                <p>
                    {currentUser.user_metadata?.name || currentUser.email}
                </p>
            </div>
        </section>
        </Link>
        }
        <SearchDrawer searchOpen={searchOpen} onClose={() => setSearchOpen(false)}/>
        <FriendsDrawer friendsDrawerOpen={friendsDrawerOpen} onClose={() => setFriendsDrawerOpen(false)} closeSidebar={() => 
            {
                setFriendsDrawerOpen(false)
                setOpen(false)
            }}/>
        <NotificationsDrawer notificationsDrawerOpen={notificationsDrawerOpen} onClose={() => setNotificationsDrawerOpen(false)} counter={notificationCounter} setCounter={setNotificationCounter} closeSidebar={() => {
            setNotificationsDrawerOpen(false)
            setOpen(false)}}/>
        <ul>
            <Icon icon={<TfiHome/>} name={'Home'} destination={'/'}/>
            <Icon icon={<TfiSearch/>} name={'Search'} onClick={() => setSearchOpen(true)}/>
            {
            currentUser && 
            <>
            <Icon icon={<TfiPlus/>} name={'Add'} destination={'/posts/new'}/>
            <Icon icon={<TfiUser/>} name={'Friends'} onClick = {() => setFriendsDrawerOpen(true)}/>
            <Icon icon={<TfiSave/>} name={'Saved'} destination={'/saved'}/>
            <Icon icon={<TfiComments/>} name={'Chat'} destination={'/chat'}/>
            </>
            }
            {currentUser && 
            <Icon icon={<HiOutlineBell/>} name={`Invites (${notificationCounter})`} onClick = {() => setNotificationsDrawerOpen(true)}/>
            }
            {currentUser ?
              <Icon icon={<TfiPowerOff/>} onClick={async () => await logoutHandler()} name={'Logout'} />
              :
              <Icon icon={<FcGoogle/>} name={'Login'} onClick={async () => await googleLogin()}/>  
            }
        </ul>
    </Drawer>
    </>
  )
}
export default Sidebar