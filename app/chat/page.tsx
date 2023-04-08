'use client'
import React, {useState, useEffect} from 'react'
import { Avatar, List } from 'antd';
import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from '../../lib/supabase';
import { User } from '../account/[id]/page';
import styles from './Chat.module.css'
import Chat from './Chat';
const Page = () => {
    const [friendsList, setFriendsList] = useState<User[]>() 
    const [chosenUser, setChosenUser] = useState<{id: string, name: string}>()
    const currentUser = useUser()
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
    },[currentUser])
  if(friendsList) {
  return (
    <div className={styles.flex}>
     <div className={styles.flexElement}>
        <h1>{chosenUser ? `Chatting with ${chosenUser.name}` : 'Chat with your friends'}</h1>
        <List
            itemLayout="horizontal"
            dataSource={friendsList}
            className={styles.list}
            size='large'
            renderItem={(item: User) => (
                <List.Item onClick={() => setChosenUser({
                    id: item.user_id,
                    name: item.metadata.full_name
                })}
                style={{cursor: 'pointer'}}
                className={chosenUser?.id == item.user_id ? styles.selected : ''}
                >
                <List.Item.Meta
                avatar={<Avatar src={item?.metadata.picture} />}
                title={<p style={{color: 'white'}}>{item.metadata.full_name}</p>}
                description={<small style={{color: 'limegreen'}}>@{item.email}</small>}
                />
                </List.Item>
        )}
        />
    </div>  
        <div className={styles.flexElement}>
            {chosenUser && <Chat userId={chosenUser.id}/>}
            {!chosenUser && friendsList && <Chat userId={friendsList[0].user_id}/>}
        </div>
    </div>
  )
  }
  else {
    return <h1>It seems you haven&apos;t got any friends yet</h1>
  }
}

export default Page