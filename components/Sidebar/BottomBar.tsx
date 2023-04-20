import { useUser } from '@supabase/auth-helpers-react'
import React from 'react'
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
    const tabs = [

    ]
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
        key: '/posts/add',
        title: <p className={styles.title}>Add</p>,
        icon: (active: boolean) =>
          active ? <TfiPlus className={styles.activeIcon} /> : <TfiPlus className={styles.inactiveIcon}/>,
      },
      {
        key: currentUser ? `/account/${currentUser.id}` : '/',
        title: currentUser ? currentUser.user_metadata.full_name : <p className={styles.title}>Login</p>,
        icon: currentUser ? <Avatar src={currentUser.user_metadata.avatar_url}/> : <FcGoogle className={styles.inactiveIcon}/>,   
      },
    ]
  return (
    <>
    {currentUser ? 
    <TabBar className={styles.bottomBar} onChange={value => router.push(value)}>
      {
      loggedInTabs.map(item => (
        <TabBar.Item icon={item.icon} key={item.key} title={item.title} className={styles.bottomBarIcon} />
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