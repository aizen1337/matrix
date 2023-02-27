import { supabase } from "../../../lib/supabase";
import Post, { Metadata, PostInterface } from "../../posts/Post";
import Image from "next/dist/client/image";
import AccountPage from './Account.module.css';
import {TfiCheck} from 'react-icons/tfi'
interface User {
  user_id: string,
  email: string,
  metadata: Metadata
}
async function getUser(id: string) {
  const {data,error} = await supabase.rpc('fetch_user_data', {id: id});
  if (error) console.log(error)
  else { 
      return data as User[]
  }
}
async function getUsersPosts(id: string) {
  const {data,error} = await supabase.rpc('get_users_posts', {parameter: id});
  if (error) console.log(error)
  else { 
      return data as PostInterface[]
  }
}
const page = async ({params}: any) => {
  const user = await getUser(params.id)
  const userPosts = await getUsersPosts(params.id)
  if (user) {
    return (
      <>
        <section className={AccountPage.top}>
          <Image
          src={user[0].metadata.picture}
          width={100}
          height={100}
          alt={user[0].metadata.full_name}
          className={AccountPage.avatar}
          />
          {user[0].metadata.email_verified && <TfiCheck className={AccountPage.badge}/>}
          <div className={AccountPage.username}>
            <h1>{user[0].metadata.full_name}</h1>
            <small>{user[0].metadata.email}</small>
          </div>
          <div className={AccountPage.socialStats}>
            <h4>Posts: {userPosts?.length} </h4>
            <h4 className={AccountPage.fans}>124123 fans</h4>
            <h4>Following: 13123</h4>
          </div>
          </section>
          {userPosts && userPosts.map((post: PostInterface) => (
              <Post key={post.id} id={post.id} snippet={post.snippet} created_at={post.created_at} image_directory={post.image_directory} title={post.title} post_author={post.post_author} metadata={post.metadata}/>
          ))}
      </>
    )
  }
}

export default page