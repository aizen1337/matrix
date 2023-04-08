'use client'
import { Avatar } from 'antd'
import React from 'react'
import { MessageType } from './Chat'
import styles from './Chat.module.css'
import { formatDistance } from 'date-fns'
import { useUser } from '@supabase/auth-helpers-react'
import { User } from '../account/[id]/page'
type Props = {
    type: 'send' | 'received',
    profilePicture: string
    message: MessageType,
}
const Message = (props: Props) => {
  return (
    <div className={props.type == 'send' ? styles.send : styles.received}>
      <section className={styles.main}>
      <Avatar
      className={styles.avatar}
      src={props.profilePicture}
      />
      <p>{props.message.message}</p>
      </section>
      <small className={styles.timestamp}>{formatDistance(new Date(props.message.created_at), new Date(), { addSuffix: true})}</small>
    </div>
  )
}

export default Message