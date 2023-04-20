'use client'
import InfiniteScroll from 'react-infinite-scroll-component'
import { supabase } from '../lib/supabase'
import Post, { PostInterface } from './posts/Post'
import { useEffect, useState } from 'react'
export default function Home() {
  const [posts,setPosts] = useState<PostInterface[]>()
  const [finish,setFinish] = useState<number>()
  async function getAllPosts() {
    const {data,error} = await supabase.from('posts').select('*', {count: 'exact', head: false})
    if (error) {
      console.log(error)
    }
    else {
      setFinish(data.length)
    }
  }
  async function getInitialPosts() {
    const {data,error} = await supabase.rpc('fetch_all_posts').limit(3)
    if (error) {
      console.log(error);
    }
    else {
      setPosts(data)
    }
  }
  useEffect(() => {
    getInitialPosts()
    getAllPosts()
  }, [])
    async function getMorePosts(){
      if(posts) {
        const {data,error} = await supabase.rpc('fetch_all_posts').range(0,posts.length+1)
        if(error) {
          console.log(error)
        }
        setPosts(await data)
        }
    }
    return (
      <>
      {  
      posts ?
      <InfiniteScroll
      dataLength={posts.length}
      next={async () => await getMorePosts()}
      hasMore={finish == posts.length ? false : true}
      loader={<h1 style={{
        textAlign: 'center',
        color: 'lightgreen',
        margin: '1rem'
      }}>Loading more posts...</h1>}
      scrollableTarget='content'
      endMessage={<h1 style={{
      textAlign: 'center',
      color: 'lightgreen',
      margin: '1rem'}}>That is it for now...</h1>}
      >
          {
          posts.map((post: PostInterface) => 
          (            
              <Post key={post.id} id={post.id} snippet={post.snippet} created_at={post.created_at} image_directory={post.image_directory} post_author={post.post_author} metadata={post.metadata} likes={post.likes}/>
          ))}
      </InfiniteScroll>
      :
      <h1>Error while loading posts</h1>
      }
      </>
    )
}
