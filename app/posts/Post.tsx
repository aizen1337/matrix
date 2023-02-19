import React from 'react'
import Link from 'next/link'
import PostStyles from './Post.module.css'
import {TfiHeart,TfiCommentAlt,TfiLocationArrow,TfiSave,TfiMore} from 'react-icons/tfi'
import Image from 'next/image'
import { formatDistance, subDays } from 'date-fns'
interface Post {
    id: number,
    created_at: string,
    body?: string,
    title?: string,
    snippet: string,
    post_author?: string,
    username: string,
    image_directory: string,
    user_id?: string,
    status?: string
  }
const Post = ({id,username,snippet,created_at, image_directory,title}: Post) => {
  return (
    <>
    <section className={PostStyles.item} key={id}>
        <div className={PostStyles.top}>
            <h6>{username}</h6>
            <TfiMore/>
        </div>
        <Link style={{
      textDecoration: 'none'
         }} href={`/posts/${id}`}>
        <div className={PostStyles.image}>
          <Image src={image_directory}
          fill
          alt={title || 'post image'}/>
        </div>
        </Link>
        <div className={PostStyles.action}>
            <TfiHeart className={PostStyles.icon}/>
            <TfiCommentAlt className={PostStyles.icon}/>
            <TfiLocationArrow className={PostStyles.icon}/>
            <TfiSave className={PostStyles.save}/>
        </div>
        <div className={PostStyles.bottom}>
          <div className={PostStyles.likesandusername}>
            <p className={PostStyles.likes}>1204123 likes</p>
            <p className={PostStyles.username}>{username}</p>
          </div>
          <p>{snippet}</p>
          <small>{formatDistance(new Date(created_at), new Date(), { addSuffix: true })}</small>
        </div>
    </section>
    <hr></hr>
    </>
  )
}

export default Post