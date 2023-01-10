import Head from 'next/head'
import React from 'react'
import Navbar from './Navbar'
const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
    <Head>
      <title>Radosław Rumian</title>
    </Head>
    <div className='content'>
        <Navbar/>
        {children}
    </div>
    </>
  )
}

export default Layout