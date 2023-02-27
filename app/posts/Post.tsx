import React from 'react'
import Link from 'next/link'
import PostStyles from './Post.module.css'
import {TfiHeart,TfiCommentAlt,TfiLocationArrow,TfiSave,TfiMore} from 'react-icons/tfi'
import Image from 'next/image'
import { formatDistance } from 'date-fns'
export interface PostInterface {
    id: number,
    created_at: string,
    body?: string,
    title?: string,
    snippet: string,
    metadata: Metadata,
    post_author: string,
    image_directory: string,
  }
  export interface Metadata {
    name: string,
    full_name: string,
    email_verified: boolean,
    picture: string
    email: string
  }
const Post = ({id,snippet,created_at, image_directory,title, post_author, metadata}: PostInterface) => {
  return (
    <>
    <section className={PostStyles.item} key={id}>
        <div className={PostStyles.top}>
            <Link style={{
              textDecoration: 'none',
              color: 'lightgreen'
            }}href={`/account/${post_author}`} className={PostStyles.user}>
            <Image src={metadata.picture} width={40} height={40} alt={metadata.full_name}/>
            <h2>{metadata.full_name || metadata.email}</h2>
            </Link>
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
            }}href={`/account/${post_author}`} className={PostStyles.username}><h3>{metadata.full_name}</h3></Link>
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