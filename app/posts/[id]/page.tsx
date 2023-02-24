import React from 'react'
import { supabase } from '../../../lib/supabase'
import Post from '../Post';
async function getPost(id: number) {
    const {data,error} = await supabase.rpc('get_post', {postid: id});
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
        <Post id={searchedPost[0].id} created_at={searchedPost[0].created_at} snippet={searchedPost[0].snippet} username={searchedPost[0].username} image_directory={searchedPost[0].image_directory} title={searchedPost[0].title} user_id={searchedPost[0].user_id}/>
    </section>
  )
    }
}


export default page