import React from 'react'
import Link from 'next/link'
import PostStyles from './Post.module.css'
import {TfiHeart,TfiCommentAlt,TfiLocationArrow,TfiSave,TfiMore} from 'react-icons/tfi'
import Image from 'next/image'
interface Post {
    id: number,
    created_at: Date,
    body?: string,
    title?: string,
    snippet: string,
    post_author: string,
    image_directory: string
  }
const Post = ({id,post_author,snippet,created_at, image_directory,title}: Post) => {
  return (
    <>
    <section className={PostStyles.item} key={id}>
        <div className={PostStyles.top}>
            <h1>{post_author}</h1>
            <TfiMore/>
        </div>
        <Link style={{
      textDecoration: 'none'
         }} href={`/posts/${id}`}>
        <div className={PostStyles.image}>
          <Image src={image_directory}
          width={550}
          height={1000}
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
          <p>1204123 likes</p>
          <p>{post_author}</p>
          <p>{snippet}</p>
          <p>{created_at.toString()}</p>
        </div>
    </section>
    <hr></hr>
    </>
  )
}

export default Post