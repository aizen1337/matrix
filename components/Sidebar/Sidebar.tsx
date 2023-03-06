import React, {useState} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import styles from './Sidebar.module.css';
import { useUser } from '@supabase/auth-helpers-react'
import {TfiImage,TfiAlignJustify, TfiHome,TfiSearch,TfiPowerOff,TfiUser, TfiSettings,TfiPlus, TfiShiftRight} from 'react-icons/tfi'
import Icon from './Icon';
import { supabase } from '../../lib/supabase';
const Sidebar = () => { 
    const [open,setOpen] = useState(false)
    const currentUser = useUser()
  return (
    <>
    <aside className={open ? `${styles.sidebar} ${styles.active}` : styles.sidebar}>
        <section className={styles.top}>
            <div className={styles.logo}>
                <TfiImage/>
                <span>
                    matrix
                </span>
            </div>
            <TfiAlignJustify className={styles.menu} onClick={() => setOpen(!open)}/>
        </section>
        {currentUser && 
        <section className={styles.user}>
            <Link href={`/account/${currentUser.id}`} style={{
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
            <Icon icon={<TfiHome/>} name={'Home'} destination={'/'}/>
            <Icon icon={<TfiPlus/>} name={'Add'} destination={'/posts/new'}/>
            <Icon icon={<TfiSearch/>} name={'Search'} destination={'#'}/>
            <Icon icon={<TfiUser/>} name={'Friends'} destination={'/friends'}/>
            <Icon icon={<TfiSettings/>} name={'Settings'} destination={'/settings'}/>
            {currentUser ?
              <Icon icon={<TfiPowerOff/>} onClick={async () => { await supabase.auth.signOut()}} name={'Logout'} />
              :
              <Icon icon={<TfiShiftRight/>} name={'Login'} destination={'/login'}/>  
            }
        </ul>
    </aside>
    </>
  )
}

export default Sidebar