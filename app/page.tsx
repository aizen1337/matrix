import styles from '../styles/Styles.module.css'
import { supabase } from '../lib/supabase'
import Post from './posts/Post'
export const dynamic='auto',
dynamicParams= true,
revalidate=0,
runtime='nodejs',
preferredRegion='auto'
async function getPosts() {
  const {data,error} = await supabase.rpc('get_posts')
  if (error) {
    console.log(error);
  }
  else {
    return data as Post[]
  }
}
export default async function Home() {
  const posts = await getPosts()
  return (
    <>  
        <main className={styles.home}>
        {
        posts?.map((post: Post) => (
            <Post key={post.id} id={post.id} username={post.username} snippet={post.snippet} created_at={post.created_at} image_directory={post.image_directory} title={post.title}/>
        ))}
        </main>
    </>
  )
}
