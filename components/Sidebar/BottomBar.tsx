import { useUser } from '@supabase/auth-helpers-react'
import React, { useEffect } from 'react'
import {TfiHome,TfiPlus,TfiComments} from 'react-icons/tfi'
import { FcGoogle } from 'react-icons/fc'
import styles from './Sidebar.module.css'
import { TabBar } from 'antd-mobile'
import { Avatar } from 'antd'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
const BottomBar = () => {
    const currentUser = useUser()
    const router = useRouter()
    const googleLogin = async () => {
      const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
        })
      if (error) console.log(error)
    }
    const loggedInTabs = [
      {
        key: '/',
        title: <p className={styles.title}>Home</p>,
        icon: (active: boolean) =>
        active ? <TfiHome className={styles.activeIcon}/> : <TfiHome className={styles.inactiveIcon}/>
      },
      {
        key: '/chat',
        title: <p className={styles.title}>Chat</p>,
        icon: (active: boolean) =>
        active ? <TfiComments className={styles.activeIcon}/> : <TfiComments className={styles.inactiveIcon}/>,
      },
      {
        key: '/posts/new',
        title: <p className={styles.title}>Add</p>,
        icon: (active: boolean) =>
          active ? <TfiPlus className={styles.activeIcon} /> : <TfiPlus className={styles.inactiveIcon}/>,
      },
      {
        key: `/account/${currentUser?.id}`,
        title: <p className={styles.title}>{currentUser?.user_metadata?.full_name}</p>,
        icon: <Avatar src={currentUser?.user_metadata?.avatar_url}/>
      },
    ]
  return (
    <>
    {currentUser ? 
    <TabBar className={styles.bottomBar} onChange={value => router.push(value)}>
      {
      loggedInTabs.map(item => (
        <TabBar.Item icon={item.icon} key={item.key} title={item.title} className={styles.bottomBarIcon}/>
      ))}
    </TabBar>
    :
    <div className={styles.bottomBar}>
      <div className={styles.notLoggedInIcon} onClick={() => router.push("/")}>
          <TfiHome className={styles.icon}/>
          <small>Home</small>
      </div>
      <div className={styles.notLoggedInIcon} onClick={async () => googleLogin()}>
          <FcGoogle className={styles.icon}/>
          <small>Login</small>
      </div>
    </div>
    }
    </>
  )
}

export default BottomBar