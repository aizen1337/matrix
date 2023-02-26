'use client'
import Head from "./head"
import '../styles/globals.css'
import { SessionContextProvider} from '@supabase/auth-helpers-react'
import Sidebar from "../components/Sidebar/Sidebar"
import { supabase } from "../lib/supabase"
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <Head />
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
