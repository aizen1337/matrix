/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useUser } from '@supabase/auth-helpers-react'
import AccountPage from './Account.module.css'
import React, { useEffect, useState } from 'react'
import {TfiUser,  TfiTrash, TfiPlus,  TfiAlert} from 'react-icons/tfi'
import {FcGoogle} from 'react-icons/fc'
import { supabase } from '../../../lib/supabase'
import {MenuProps, notification} from 'antd'
import { Dropdown } from 'antd'
import Link from 'next/link'
type FriendshipRequestButtonProps = {
  userId: string,
  userFullName: string
}
type friendshipStatus = 'request_send' | 'request_received' | 'friendship' | 'open';
const FriendshipRequestButton = ({userId, userFullName}: FriendshipRequestButtonProps) => {
  const currentUser = useUser()
  const [status,setStatus] = useState<friendshipStatus>('open')
  async function searchForSendRequest() {
    if(currentUser) {
    const {data,error} = await supabase.from('friendship_requests').select('*').eq('to', userId).eq('from', currentUser.id)
      if(error) {
        throw new Error(error.message)
      }
      else if(data && data.length == 1) {
        setStatus("request_send")
      }
    }
  }
  async function searchForReceivedRequest() {
    if(currentUser) {
      const {data,error} = await supabase.from('friendship_requests').select('*').eq('to', currentUser.id).eq('from', userId)
      if(error) {
        throw new Error(error.message)
      }
      else if(data && data.length == 1) {
        setStatus("request_received")
      }
    }
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
          setStatus('friendship')
        }
      }
  }
  useEffect(() => {
      searchForSendRequest()
      searchForReceivedRequest()
      searchForFriendship()
  },[searchForFriendship, searchForReceivedRequest, searchForSendRequest])
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <button className={AccountPage.dropdownItem} onClick={() => acceptFriendshipRequest(userId, userFullName)}>Add to friends list</button>
        )
      },
      {
        key: '2',
        danger: true,
        label: (
          <button className={AccountPage.dropdownItem} onClick={() => rejectFriendshipRequest(userId)}>Reject the request</button>
        )
      }
    ]
    async function sendFriendshipRequest() {
      if(currentUser) {
        const {error} = await supabase.from('friendship_requests').insert({
          from: currentUser.id,
          to: userId
        })
        if(error) {
          notification.error({
            message: 'Error occurred while attempting to send an invitation',
            description: error.message
          })
        }
        else {
          notification.success({
            message: 'Request successfully send'
          })
          setStatus('request_send')
        }
      }
    }

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
          setStatus('open')
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
            setStatus('friendship')
          }
        }
      }
    }
    async function deleteUserFromFriends(user_id: string, userFullName: string) {
      if(currentUser) {
        const {error} = await supabase.rpc("deleteFriendship", {
          logged_in_user_id: currentUser.id,
          seeked_user_id: user_id
        })
        if(error) {
          notification.error({
            message: 'Error occurred while deleting friendship',
            description: error.message
          })
        }
        else {
          notification.info({
            message: `You are no longer friends with ${userFullName}`
          })
          setStatus('open')
        }
      }
    }
    async function cancelFriendshipRequest(user_id: string) {
      if(currentUser) {
        const {error} = await supabase.from('friendship_requests').delete().eq('from', currentUser.id).eq('to', user_id)
        if(error) {
          notification.error({
            message: 'Error occurred while cancelling request',
            description: error.message
          })
        }
        else {
          notification.info({
            message: `Request cancelled!`
          })
          setStatus('open')
        }
      }
    }
      const googleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
          })
        if (error) console.log(error)
    }
    if(!currentUser) {
      return <div onClick={() => googleLogin} className={AccountPage.friendshipButton}>You have to login <FcGoogle/></div>
    }
    else if(currentUser?.id !== userId) {
        if(status === 'friendship') {
          return (
          <button className={AccountPage.friendshipButton} onClick={() => deleteUserFromFriends(userId,userFullName)}>Delete user from friendslist <TfiTrash/></button>
          )
        }
        else if(status === 'request_received') {
          return (
          <Dropdown menu={{items}} overlayClassName={AccountPage.dropdown} >
            <button className={AccountPage.friendshipButton} onClick={(e) => e.preventDefault()}>Request received! <TfiUser/></button>
          </Dropdown>
          )
        }
        else if(status === 'request_send') {
          return (
          <button className={AccountPage.friendshipButton} onClick={() => cancelFriendshipRequest(userId)}>Request sent! <TfiAlert/></button>
          )
        }
        else {
          return (
          <button className={AccountPage.friendshipButton} onClick={() => sendFriendshipRequest()}>Send friendship request <TfiPlus/></button>
          )
        }
    }
    else {
      return <></>
    }
}

export default FriendshipRequestButton