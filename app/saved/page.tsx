'use client'
import { useUser } from '@supabase/auth-helpers-react'
import React, {useEffect, useState} from 'react'
import { supabase } from '../../lib/supabase'
import grid from '../account/[id]/Account.module.css'
import { PostInterface } from '../posts/Post'
import Link from 'next/link'
import Image from 'next/image'
type SavedPostResponse = false | 'empty' | PostInterface[]
const Page = () => {
  const currentUser = useUser()
  const [savedPosts,setSavedPosts] = useState<SavedPostResponse>('empty')
  useEffect(() => {
    async function getSavedPosts() {
        if(currentUser) {
            const {data,error} = await supabase.rpc('get_saved_posts', {query: currentUser.id})
            if(error) {
                console.log(error)
                setSavedPosts(false)
            }      
            else if (data?.length == 0) {
                setSavedPosts('empty')
            }
            else {
                setSavedPosts(data as PostInterface[])
            }   
        }
    }
    getSavedPosts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if(currentUser) {
    return (
        <>
        <h1>Saved posts</h1>
        <section className={grid.grid}>
        {
         savedPosts == 'empty' && <h1>You dont have any saved posts.</h1>
        }
        { savedPosts !== 'empty' && savedPosts !== false && savedPosts.map((post: PostInterface) => (
                <div className={grid.gridItem} key={post.id} >
                    <Link href={`/posts/${post.id}`} >
                        <Image src={post.image_directory.urls[0]} alt={post.snippet} fill sizes="" className={grid.image}/>
                    </Link>
                </div>
            ))
        }
        </section>
        </>
    )
  }
  else {
    return <h1>Access denied</h1>
  }
}

export default Page