/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import AccountPage from './Account.module.css'
import { TfiEmail } from 'react-icons/tfi'
import { supabase } from '../../../lib/supabase'
import { useUser } from '@supabase/auth-helpers-react'
type Props = {
    accountId: string,
}
const ChatButton = (props: Props) => {
    const currentUser = useUser()
    const [friendship,setFriendship] = useState(false)
    async function searchForFriendship() {
        if(currentUser) {
          const {data,error} = await supabase.rpc('searchforfriendship', {
            logged_in_user_id: currentUser.id,
            seeked_user_id: props.accountId
          })
          if(error) {
            throw new Error(error.message)
          }
          else if(data && data.length == 1) {
            setFriendship(true)
          }
        }
    }
        useEffect(()=> {
            searchForFriendship()}
             ,[searchForFriendship])
    if(friendship && currentUser && currentUser.id !== props.accountId) {
        return (
            <Link href={`/chat/${props.accountId}`} className={AccountPage.chat}>
                Chat with user <TfiEmail/>
            </Link>
        )
    }
    else if(currentUser && currentUser?.id === props.accountId) {
        return null
    }
    else if(currentUser && !friendship) {
        return <p className={AccountPage.chat} style={{
            cursor: 'not-allowed'
        }}>You aren&apos;t friends<TfiEmail/></p>
    }
    else if (!currentUser){
        return null
    }
    else {
        return null
    }
}
export default ChatButton