'use client'
import { SessionContextProvider} from '@supabase/auth-helpers-react'
import Sidebar from "../components/Sidebar/Sidebar"
import BottomBar from '../components/Sidebar/BottomBar'
import '../styles/globals.css'
import { supabase } from "../lib/supabase"
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
      <SessionContextProvider supabaseClient={supabase}>
          <Sidebar/>
          <div className="content" id="content">
            {children}
          </div>
          <BottomBar/>
       </SessionContextProvider>
      </body>
    </html>
  )
}
