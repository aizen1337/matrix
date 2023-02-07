'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const User = () => {
    const {data: session} = useSession()
  return (
    <div>
        <p className=''>
            {session?.user?.name}
        </p>
        <Image src={session?.user?.image as string} alt={session?.user?.name as string}/>
        <i>Verified</i>
    </div>
  )
}

export default User