import Link from 'next/link'
import styles from '../styles/Styles.module.css'
import { supabase } from '../lib/supabase'
import Post from './posts/Post'
export const dynamic='auto',
dynamicParams= true,
revalidate=0,
fetchCache='default-no-store',
runtime='nodejs',
preferredRegion='auto'
async function getPosts() {
  const {data,error} = await supabase.from('posts').select()
  if (data) {
    return data as Post[]
  }
}
export default async function Home() {
  const posts = await getPosts()
  return (
    <>  
        <main className={styles.home}>
        {posts?.map((post: Post) => (
            <Post id={post.id} post_author={post.post_author} snippet={post.snippet} key={post.id} created_at={post.created_at} image_directory={post.image_directory} title={post.title}/>
        ))}
        </main>
    </>
  )
}
