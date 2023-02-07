'use client'
import Head from "./head"
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import Sidebar from "../components/Sidebar/Sidebar"
export default function RootLayout({
  children,
  session
}: {
  children: React.ReactNode,
  session: Session
}) {
  return (

    <html>
      <Head />
      <body>
        <SessionProvider session={session}>
        <Sidebar/>
        <div className="content">
        {children}
        </div>
        </SessionProvider>
      </body>
    </html>

  )
}
