'use client'
import Head from "./head"
import '../styles/globals.css'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider} from '@supabase/auth-helpers-react'
import Sidebar from "../components/Sidebar/Sidebar"
import { useState } from "react"
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY!,
}))
  return (
    <html>
      <Head />
      <body>
      <SessionContextProvider supabaseClient={supabaseClient}>
          <Sidebar/>
          <div className="content">
            {children}
          </div>
       </SessionContextProvider>
      </body>
    </html>
  )
}
