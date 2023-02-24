import React from 'react'
import Link from 'next/link'
import PostStyles from './Post.module.css'
import {TfiHeart,TfiCommentAlt,TfiLocationArrow,TfiSave,TfiMore} from 'react-icons/tfi'
import Image from 'next/image'
import { formatDistance,formatISO } from 'date-fns'
interface Post {
    id: number,
    created_at: string,
    body?: string,
    title?: string,
    snippet: string,
    username: string,
    user_id: string,
    image_directory: string,
  }
const Post = ({id,username,snippet,created_at, image_directory,title, user_id}: Post) => {
  return (
    <>
    <section className={PostStyles.item} key={id}>
        <div className={PostStyles.top}>
            <h2>{username}</h2>
            <TfiMore/>
        </div>
        <Link style={{
          textDecoration: 'none'
         }} href={`/posts/${id}`}>
        <div className={PostStyles.image}>
          <Image 
          src={image_directory}
          fill
          priority={false}
          sizes=" 
          "
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
            <p className={PostStyles.likes}>1204123 <b>likes</b></p>
            <Link style={{
              textDecoration: 'none',
              color: 'lightgreen'
            }}href={`/user/${user_id}`} className={PostStyles.username}><h3>{username}</h3></Link>
          </div>
          <p>{snippet}</p>
          <small>{formatDistance(new Date(created_at), new Date(), {addSuffix: true})}</small>
        </div>
    </section>
    <hr></hr>
    </>
  )
}

export default Post