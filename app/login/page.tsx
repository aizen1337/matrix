'use client'
import React from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import styles from './Login.module.css'
import {IoLogoGoogle,IoLogoFacebook} from 'react-icons/io5'
const Page = () => {
    const supabase = useSupabaseClient()
    const facebookLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'facebook',
          })
    }
    const googleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
          })
    }
        return ( 
                <section className={styles.container}>
                <button onClick={() => facebookLogin()} className={styles.facebook}>Sign in using <IoLogoFacebook/></button>
                <button onClick={() => googleLogin()}className={styles.google}>Sign in using <IoLogoGoogle/></button>
                </section>
        )
}
export default Page