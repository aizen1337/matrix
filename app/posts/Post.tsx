'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import PostStyles from './Post.module.css'
import {TfiCommentAlt,TfiLocationArrow,TfiSave,TfiMore , TfiRssAlt, TfiSaveAlt, TfiTrash, TfiCheckBox} from 'react-icons/tfi'
import {RiHeartAddLine, RiHeartAddFill} from 'react-icons/ri'
import Image from 'next/image'
import { formatDistance } from 'date-fns'
import { useState } from 'react'
import ImageSlider from './ImageSlider'
import { Drawer, Space, notification } from 'antd'
import Button from 'antd/es/button'
import CommentsModal from './CommentsModal'
import { supabase } from '../../lib/supabase'
import { Comment } from './CommentsModal'
import { User, useUser } from '@supabase/auth-helpers-react'
import DeleteModal from './DeleteModal'
import Badge from './Badge'
import { useRouter } from 'next/navigation'
export interface PostInterface {
    id: number,
    created_at: string,
    snippet: string,
    metadata: Metadata,
    post_author: string,
    image_directory: PostImages,
    likes: number
  }
  export interface PostImages {
    urls: string[];
  }
  export interface Metadata {
    name: string,
    full_name: string,
    email_verified: boolean,
    picture: string
    email: string
  }

const Post = ({id,snippet,created_at, image_directory, post_author, metadata, likes}: PostInterface) => {
  const currentUser = useUser()
  const router = useRouter()
  const [change,setChange] = useState<any>()
  const [open, setOpen] = useState(false)
  const [likedPost, setLikedPost] = useState(false) 
  const [likesAmount,setLikesAmount] = useState(likes)
  const [openComments, setOpenComments] = useState(false)
  const [saved,setSaved] = useState(false)
  const [comments,setComments] = useState<Comment[]>([])
  const [deleteModalOpen,setDeleteModalOpen] = useState(false)
  const savePost = async () => {
    if(!currentUser) {
      notification.error({
        message: "You have to be logged in to save posts"
      })
      return 
    }
    const {error} = await supabase.from('savedposts').insert({
      post_id: id,
      user_id: currentUser.id
    })
    if(error) console.log(error)
    notification.success({
      message: "Successfully saved!"
    })
    setSaved(true)
  }
  async function incrementLikes() {
    const {error} = await supabase.from('posts').update({likes: (likesAmount+1)}).eq("id", id)
  }
  async function decrementLikes() {
    const {error} = await supabase.from('posts').update({likes: (likesAmount-1)}).eq("id", id)
  }
  async function unsavePost() {
    if(currentUser) {
      const {error} = await supabase.from('savedposts').delete().eq("post_id", id).eq('user_id', currentUser.id)
      if(error) {
        console.log(error)
      }
      else {
        notification.info({
          message: "Post deleted from saved posts"
        })
        setSaved(false)
      }
    }
  }
  async function likePost() {
    if(!currentUser) {
      notification.error({
        message: "You have to be logged in to like posts"
      })
      return 
    }
    const {error} = await supabase.from('likedposts').insert({
      post_id: id,
      user_id: currentUser.id
    })
    if(error) console.log(error)
    else {
    notification.success({
      message: "Post liked!"
    })
    await incrementLikes()
    setLikedPost(true)
    setLikesAmount(likesAmount+1)
    }
  }
  async function dislikePost() {
    if(currentUser) {
      const {error} = await supabase.from('likedposts').delete().eq("post_id", id).eq('user_id', currentUser.id)
      if(error) {
        console.log(error)
      }
      else {
        notification.info({
          message: "Post disliked"
        })
        await decrementLikes()
        setLikedPost(false)
        setLikesAmount(likesAmount-1)
        
      }
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function isPostSaved(id: number, user: User) {
    if(currentUser) {
      const {data,error} = await supabase.from('savedposts').select("*").eq('user_id', user.id).eq('post_id', id)
      if(error) {
        console.log(error)
      }
      else if(data.length === 0) {
        setSaved(false)
      }
      else {
        setSaved(true)
      }
    }
 }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function isPostLiked(id: number, user: User) {
    if(currentUser) {
      const {data,error} = await supabase.from('likedposts').select("*").eq('user_id', user.id).eq('post_id', id)
        if(error) {
          console.log(error)
        }
        else if(data.length === 0) {
          setLikedPost(false)
        }
        else {
          setLikedPost(true)
        }
      }
   }
    useEffect(() => {
    async function getComments(id: number) {
      const {data,error} = await supabase.rpc('get_comments', {query: id})
      if (error) console.log(error)
      else {
        setComments(data)
      }
    } 
      getComments(id)
    },[change, id])
  useEffect(() => {
    if(currentUser) {
      isPostSaved(id, currentUser)
      isPostLiked(id, currentUser)
    }
  }, [currentUser, id, isPostLiked, isPostSaved])
  return (
    <section className={PostStyles.item} key={id}>
        <div className={PostStyles.top}>
            <Link style={{
              textDecoration: 'none',
              color: 'lightgreen'
            }}href={`/account/${post_author}`} className={PostStyles.user}>
            <Image src={metadata?.picture} width={40} height={40} alt={metadata?.full_name}/>
            <h2>{metadata?.full_name || metadata?.email}</h2>
            </Link>
            <TfiMore onClick={() => setOpen(true)} style={{
              cursor: 'pointer'
            }}/>
            <Drawer placement="bottom" 
              style={{
              background: 'black',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            bodyStyle={{padding: '2rem', marginLeft: 'auto', marginRight: 'auto'}}
            onClose={() => setOpen(false)} open={open}>
              <Space direction="vertical" >
              <Link href={`/posts/${id}`}><Button type='primary' className={PostStyles.drawerButton} ><>Head over to post</><TfiLocationArrow/></Button></Link>
              {!saved ? 
              <Button type='primary' className={PostStyles.drawerButton} onClick={() => savePost()}><>Save for later</> <TfiSaveAlt/></Button> 
              : 
              <Button type='primary' className={PostStyles.drawerButton} onClick={() => unsavePost()}><>Saved!</> <TfiSaveAlt/></Button> 
              }
              {currentUser && currentUser.id == post_author &&
              <Button type='primary' className={PostStyles.drawerButton} onClick={() => setDeleteModalOpen(true)} danger><>Delete</> <TfiTrash/></Button>
              }
              </Space>
            </Drawer>
        </div>
        <ImageSlider images={image_directory} id={id} onDoubleClick={!likedPost ? () => likePost() : () => dislikePost()} publishedPost/>
        <div className={PostStyles.action}>
            {!likedPost ? <RiHeartAddLine className={PostStyles.icon} onClick={() => likePost()}/>  : <RiHeartAddFill className={PostStyles.icon} onClick={() => dislikePost()}/>}
            <div className={PostStyles.comment}>
              <TfiCommentAlt className={PostStyles.icon} onClick={() => setOpenComments(true)}/>
              <Badge count={comments.length}/>
            </div>
            {!saved ? <TfiSave className={PostStyles.save} onClick={() => savePost()}/> : <TfiCheckBox className={PostStyles.save} onClick={() => unsavePost()}/>}
        </div>
        <CommentsModal open={openComments} comments={comments} setter={setChange} onClose={() => setOpenComments(false)} id={id}/>
        <DeleteModal open={deleteModalOpen} id={id} post_author={post_author} onClose={() => setDeleteModalOpen(false)} content="post"/>
        <div className={PostStyles.bottom}>
          <div className={PostStyles.likesandusername}>
            <p className={PostStyles.likes}>{likesAmount} <b>likes</b></p>
            <Link style={{
              textDecoration: 'none',
              color: 'lightgreen'
            }} href={`/account/${post_author}`} className={PostStyles.username}><h3>{metadata?.full_name}</h3></Link>
          </div>
          <p>{snippet}</p>
          <small>{
          created_at ?
          formatDistance(new Date(created_at), new Date(), {addSuffix: true}) :
           "loading..."}
           </small>
        </div>
    </section>
  )
}

export default Post