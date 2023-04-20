import { useUser } from '@supabase/auth-helpers-react'
import React, {useEffect, useState} from 'react'
import { supabase } from '../../lib/supabase'
import type { User } from '../../app/account/[id]/page'
import { Drawer, List, Avatar, Button, notification } from 'antd';
import { useRouter } from 'next/navigation';
type Props = {
    notificationsDrawerOpen: boolean
    onClose: (value: React.SetStateAction<boolean>) => void,
    counter: number,
    setCounter: (value: React.SetStateAction<number>) => void,
    closeSidebar: (value: React.SetStateAction<boolean>) => void
}
const NotificationsDrawer = (props: Props) => {
  const currentUser = useUser()
  const router = useRouter()
  const [notifications,setNotifications] = useState<any[]>()
  useEffect(() => {
    async function searchForReceivedRequest() {
        if(currentUser) {
          const {data,error} = await supabase.rpc('get_received_friendship_requests', {query: currentUser.id})
          if(error) {
            throw new Error(error.message)
          }
          else if (data && data.length > 0) {
            setNotifications(data as any[])
            props.setCounter(data.length)
            const audioContainer: any = document.getElementById("container"); 
            audioContainer?.play()
          }
        }
      }
      searchForReceivedRequest()
  },[props.notificationsDrawerOpen])
  async function rejectFriendshipRequest(user_id: string) {
    if(currentUser) {
      const {error} = await supabase.from('friendship_requests').delete().eq('from', user_id).eq('to', currentUser.id)
      if(error) {
        notification.error({
          message: 'Error occurred while attempting to reject an invitation',
          description: error.message
        })
      }
      else {
        notification.info({
          message: 'Request rejected'
        })
        router.refresh()
        props.closeSidebar(false)
      }
    }
  }
  async function acceptFriendshipRequest(user_id: string, userFullName: string) {
    if(currentUser) {
      const {error} = await supabase.from('friendship_requests').delete().eq('from', user_id).eq('to', currentUser.id)
      if(error) {
        notification.error({
          message: 'Error occurred while attempting to reject an invitation',
          description: error.message
        })
      }
      else {
        const {error} = await supabase.from('friendships').insert({
          user1: currentUser.id,
          user2: user_id
        })
        if(error) {
          notification.error({
            message: 'Error occurred while creating relationship',
            description: error.message
          })
        }
        else {
          notification.success({
            message: `You and ${userFullName} are friends now!`,
          })
          props.closeSidebar(false)
          router.refresh()
        }
      }
    }
  }
  return (
    <Drawer open={props.notificationsDrawerOpen} onClose={() => props.onClose(false)} placement='left'
    style={{
        background: '#262626',
    }}>
         <h1>Friendship invites</h1>
         <List
        itemLayout="horizontal"
        dataSource={notifications}
        renderItem={(item: User) => (
            <List.Item>
            <List.Item.Meta
            avatar={<Avatar src={item.metadata.picture}/>}
            title={<><p style={{color: 'white'}}>{item.metadata.full_name}</p> <small style={{color: 'limegreen'}}>@{item.email}</small></>}
            description={
              <>
              <Button onClick={() => acceptFriendshipRequest(item.user_id, item.metadata.full_name)}>Accept invite</Button>
              <Button danger onClick={() => rejectFriendshipRequest(item.user_id)}>Reject</Button>
              </>
            }
  
            />
            </List.Item>
        )}/>
    </Drawer>
  )
}

export default NotificationsDrawer