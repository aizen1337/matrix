'use client'
import React from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth, ThemeSupa, } from '@supabase/auth-ui-react'
import { Provider } from '@supabase/supabase-js';
const Page = () => {
    const session = useSession()
    const supabase = useSupabaseClient()
        return (
            <Auth providers={["google" as Provider, "facebook" as Provider]} supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
        )
}
export default Page