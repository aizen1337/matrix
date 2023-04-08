import React from 'react'
import { supabase } from '../../../lib/supabase'
import Post, { PostInterface } from '../Post';
async function getPost(id: number) {
    const {data,error} = await supabase.rpc('get_post', {query: id});
    if (error) console.log(error)
    else { 
        return data as PostInterface[]
    }
}
const page = async ({params}: any) => {
 const searchedPost = await getPost(params.id);
 if (searchedPost) { 
  return (   
         <>
         <Post id={searchedPost[0].id} created_at={searchedPost[0].created_at} snippet={searchedPost[0].snippet} metadata={searchedPost[0].metadata} image_directory={searchedPost[0].image_directory} post_author={searchedPost[0].post_author}/>
         </>
    )
    }
}


export default page