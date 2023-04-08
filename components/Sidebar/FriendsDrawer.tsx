import { useUser } from '@supabase/auth-helpers-react'
import React, {useEffect, useState} from 'react'
import { supabase } from '../../lib/supabase'
import type { User } from '../../app/account/[id]/page'
import { Drawer, List, Avatar } from 'antd';
import Link from 'next/link' 
import {TfiComments} from 'react-icons/tfi'
type Props = {
    friendsDrawerOpen: boolean
    onClose: (value: React.SetStateAction<boolean>) => void
    closeSidebar: (value: React.SetStateAction<boolean>) => void
}
const FriendsDrawer = (props: Props) => {
    const currentUser = useUser()
    const [friendsList, setFriendsList] = useState<User[]>() 
    useEffect(() => {
    const getFriendsList = async () => {
        if(currentUser) {
        const {data,error} = await supabase.rpc('get_friends_list', {query: currentUser.id})
        if(error) console.log(error)
        if(data)
        {
            const result = data.filter((friend: { user_id: string; }) => friend.user_id !== currentUser.id)
            setFriendsList(result)
        }
    }}
    getFriendsList()
},[props.friendsDrawerOpen])
  return (
    <Drawer open={props.friendsDrawerOpen} onClose={() => props.onClose(false)} placement='left' zIndex={100000000000}
    style={{
        background: '#262626',
    }}>
        <h1>Your friends</h1>
        <List
        itemLayout="horizontal"
        dataSource={friendsList}
        renderItem={(item: User) => (
        <>
        <Link href={`/account/${item.user_id}`}>
            <List.Item>
            <List.Item.Meta
            avatar={<Avatar src={item?.metadata.picture} />}
            title={<p style={{color: 'white'}}>{item.metadata.full_name}</p>}
            description={<small style={{color: 'limegreen'}}>@{item.email}</small>}
            />
            </List.Item>
        </Link>
         <div onClick={() => props.closeSidebar(false)}>
         <Link style={{color: 'green'}} href={`/chat/${item.user_id}`}>Chat with {item?.metadata.full_name} <TfiComments/> </Link>
         </div>
         </>
        )}/>
    </Drawer>
  )
}

export default FriendsDrawer