import { supabase } from '../lib/supabase'
import Post, { PostInterface } from './posts/Post'
export const dynamic='auto',
dynamicParams= true,
revalidate=0,
runtime='nodejs',
preferredRegion='auto'
async function getPosts() {
  const {data,error} = await supabase.rpc('fetch_all_posts')
  if (error) {
    console.log(error);
  }
  else {
    return data as PostInterface[]
  }
}
export default async function Home() {
  const posts = await getPosts()
  if(posts)
  {
    return (
      <>
          {
          posts.map((post: PostInterface) => 
          (            
              <Post key={post.id} id={post.id} snippet={post.snippet} created_at={post.created_at} image_directory={post.image_directory} post_author={post.post_author} metadata={post.metadata} likes={post.likes}/>
          ))}
      </>
    )
  }
}
