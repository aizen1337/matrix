'use client'
import { SessionContextProvider, useUser} from '@supabase/auth-helpers-react'
import Sidebar from "../components/Sidebar/Sidebar"
import '../styles/globals.css'
import { supabase } from "../lib/supabase"
import { useEffect } from 'react'
import { notification } from 'antd'
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const currentUser = useUser()
  useEffect(() => {
      const channel = supabase.channel('realtime chat')
      .on("postgres_changes",
      {
          event: "INSERT",
          schema: "public",
          table: "posts",
          filter: `post_author.neq=${currentUser?.id}`
      },
      (payload) => {
        let notificationSound = new Audio('./sound.mp3')
        notificationSound.play()
        notification.info({
          message: `New post!`
        })
      }
      )
      .subscribe()
      return () => {
        supabase.removeChannel(channel)
      }
  },[])
  return (
    <html>
      <body>
      <SessionContextProvider supabaseClient={supabase}>
          <Sidebar/>
          <div className="content">
            {children}
          </div>
       </SessionContextProvider>
      </body>
    </html>
  )
}
