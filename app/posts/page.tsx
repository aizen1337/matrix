import React from 'react';
import styles from '../../styles/Styles.module.css';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';
export const dynamic='auto',
dynamicParams= true,
revalidate=0,
fetchCache='auto',
runtime='nodejs',
preferredRegion='auto'
interface Post {
  id: number,
  created_at: Date,
  body: string,
  title: string,
  snippet: string,
  post_author: number
}
async function getPosts() {
    console.log(supabase)
    const {data} = await supabase.from('posts').select();
    return data as Post[]
} 
export default async function Index() {
  const posts = await getPosts()
  return (
    <section className={styles.center}>
      {posts?.map((post: Post) => (
          <section className={styles.item} key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.post_author}</p>
            <Link className={styles.itemLink} href={`/posts/${post.id}`}>Read more</Link>
          </section>
      ))}
    </section>
  )
}