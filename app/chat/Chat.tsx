'use client'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Metadata } from '../posts/Post'
import { User, useUser } from '@supabase/auth-helpers-react'
import styles from './Chat.module.css'
import {TfiFaceSmile, TfiLocationArrow} from 'react-icons/tfi'
import Message from './Message'
export type MessageType = {
  id: number
  sender_id: string,
  receiver_id: string
  sender: string,
  receiver: string
  message: string,
  sender_metadata: Metadata,
  receiver_metadata: Metadata,
  created_at: string
}
type Props = {
  userId: string
}
export default function Chat({userId}: Props) {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [newMessage, setNewMessage] = useState('')
  const dummyRef = useRef<HTMLInputElement>(null)
  const [friendship,setFriendship] = useState(false)
  const currentUser = useUser() as User
  useEffect(() => {
    const fetchMessages = async () => {
      if(currentUser) {
      const { data, error } = await supabase.rpc('get_messages', {
        currentuser: currentUser.id,
        seekeduser: userId
      })
      if (error) console.error(error)
      setMessages(data as MessageType[])
      }
    }
    if(dummyRef.current !== null) {
      dummyRef.current.scrollIntoView({behavior: 'smooth', block: 'start'})
    }
    async function searchForFriendship() {
        if(currentUser) {
          const {data,error} = await supabase.rpc('searchforfriendship', {
            logged_in_user_id: currentUser.id,
            seeked_user_id: userId
          })
          if(error) {
            throw new Error(error.message)
          }
          else if(data && data.length == 1) {
            setFriendship(true)
          }
        }
    }
    searchForFriendship()
    fetchMessages()
  }, [currentUser, userId])
  useEffect(() => {
    const channel = supabase.channel('realtime chat')
    .on("postgres_changes",
    {
        event: "INSERT",
        schema: "public",
        table: "chat",
    },
    (payload: any) => {
        setMessages([...messages, payload.new as MessageType])
      }
    )
    .subscribe()
    if(dummyRef.current !== null) {
      dummyRef.current.scrollIntoView({behavior: 'smooth', block: 'start'})
    }
    return () => {
      supabase.removeChannel(channel)
    }
  }, [messages])
  const handleNewMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!newMessage.trim()) return
    const { error } = await supabase.from('chat').insert({
      sender_id: currentUser?.id,
      receiver_id: userId,
      message: newMessage
    })
    if (error) console.error(error)
    else setNewMessage('')
  }
  if(currentUser && userId && friendship) {
  return (
    <>
      <ul className={styles.chat}> 
        {messages && messages.map((message) => (
          <Message type={currentUser?.id == message.sender_id ? 'send' : 'received'} message={message} profilePicture={currentUser?.id === message.sender_id ? currentUser?.user_metadata?.avatar_url : message.sender_metadata?.picture} key={message.id}/>
        ))}
        {(!messages || messages.length == 0) && <h1 className={styles.heading}>Say hello <TfiFaceSmile/></h1>}
        <p ref={dummyRef} style={{display: 'none'}}></p>
      </ul>
      <form className={styles.input} onSubmit={handleNewMessage}>
        <input
          type="text"
          value={newMessage}
          className={styles.textInput}
          onChange={(event) => setNewMessage(event.target.value)}
          placeholder="Your message..."
        />
        <button type="submit" className={styles.sendButton}>Send <TfiLocationArrow/></button>
      </form>
    </>
  )
}
else {
  return <h1>Access denied</h1>
}
}