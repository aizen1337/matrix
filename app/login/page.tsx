'use client'
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';
const Page = () => {
    const router = useRouter();
    const {data: session} = useSession();
    if(session) {
        router.push('/')
    }
    else {
        return (
        <section>
            <button onClick={() => signIn()}>Zaloguj</button>
        </section>
        )
    }
}

export default Page