import Head from "./head"
import Navbar from "../components/Navbar"
import '../styles/globals.css'
import { Providers } from "../components/Providers"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html>
      <Head />
      <body>
        <Navbar/>
        <Providers>
        {children}
        </Providers>
      </body>
    </html>

  )
}
