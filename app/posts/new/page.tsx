'use client'
import React from 'react'
import { PostForm } from './PostForm'
import { useUser } from '@supabase/auth-helpers-react'
export default function Page() {
  const currentUser = useUser()
  if (currentUser) {
    return (
          <PostForm loggedUser={currentUser}/>
    )
  }
}
