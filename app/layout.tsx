'use client'
import { SessionContextProvider} from '@supabase/auth-helpers-react'
import Sidebar from "../components/Sidebar/Sidebar"
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
          <audio id="container">
            <source src='./sound.mp3' type='audio/mpeg'/>
          </audio>
          <Sidebar/>
          <div className="content">
            {children}
          </div>
       </SessionContextProvider>
      </body>
    </html>
  )
}
