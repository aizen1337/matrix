import { supabase } from "../../../lib/supabase";
import Post, { Metadata, PostInterface } from "../../posts/Post";
import Image from "next/dist/client/image";
import AccountPage from './Account.module.css';
import {TfiCheck} from 'react-icons/tfi'
import Link from "next/link";
interface User {
  user_id: string,
  email: string,
  metadata: Metadata
}
async function getUser(id: string) {
  const {data,error} = await supabase.rpc('get_user_data', {query: id});
  if (error) console.log(error)
  else { 
      return data as User[]
  }
}
async function getUsersPosts(id: string) {
  const {data,error} = await supabase.rpc('get_user_posts', {query: id});
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
          <div>
          <Image
          src={user[0].metadata.picture}
          width={100}
          height={100}
          alt={user[0].metadata.full_name}
          className={AccountPage.avatar}
          />
          </div>
          <div className={AccountPage.username}>
            <h1>{user[0].metadata.full_name} {user[0].metadata.email_verified && <TfiCheck className={AccountPage.badge}/>}</h1>
            <small>{user[0].metadata.email}</small>
          </div>
          <div className={AccountPage.socialStats}>
            <h4>
              {userPosts?.length} posts/post
            </h4>
            <h4 className={AccountPage.fans}>124123 fans</h4>
            <h4>Following: 13123</h4>
          </div>
          </section>
          <section className={AccountPage.grid}>
          { userPosts &&
            userPosts?.length > 0 ? userPosts.map((post: PostInterface) => (
            <div className={AccountPage.gridItem} key={post.id} >
             <Link href={`/posts/${post.id}`} >
              <Image src={post.image_directory.urls[0]} alt={post.snippet} fill sizes=""/>
             </Link>
             </div>
          )):
          <h1>User hasn`t posted anything yet.</h1>
          }
          </section>
      </>
    )
  }
}

export default page