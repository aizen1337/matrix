import React from 'react'
import { supabase } from '../../../lib/supabase'
import Post from '../Post';
async function getPost(id: number) {
    const {data,error} = await supabase.rpc('fetch_post', {post_id: id});
    if (error) console.log(error)
    else { 
        return data as Post[]
    }
}
const page = async ({params}: any) => {
 const searchedPost = await getPost(params.id);
 if (searchedPost) { 
  return (
    <section>
        <Post id={searchedPost[0].id} created_at={searchedPost[0].created_at} snippet={searchedPost[0].snippet} metadata={searchedPost[0].metadata} image_directory={searchedPost[0].image_directory} title={searchedPost[0].title} post_author={searchedPost[0].post_author}/>
    </section>
  )
    }
}


export default page