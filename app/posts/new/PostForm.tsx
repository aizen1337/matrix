'use client'
import React from "react"
import { ChangeEvent, useState } from "react"
import {TfiCommentAlt, TfiLocationArrow } from "react-icons/tfi"
import {RiHeartAddLine} from 'react-icons/ri'
import { User } from '@supabase/supabase-js'
import Image from "next/image"
import PostItem from '../Post.module.css';
import ImageSlider from "../ImageSlider"
import {format} from 'date-fns'
import picture from './picture.jpg'
import formStyles from './Form.module.css'
import { usePostContext } from "../PostContext"
import { useUser } from "@supabase/auth-helpers-react"
export const PostForm = () => {
    const loggedUser = useUser()
    const {uploadPhoto,publishPost,images} = usePostContext();
    const [snippetRef, setSnippetRef] = useState<string>("")
    const uploadHandler = async (e: ChangeEvent<HTMLInputElement>, user: User) => {
        await uploadPhoto({e, user})
    }
    const submitFunction = async(e: any) => {
        e.preventDefault()
        if(loggedUser) {
        publishPost(snippetRef as unknown as string, loggedUser)
        }
    }
  return (
    <form onSubmit={submitFunction} className={formStyles.form}>
        {loggedUser && 
        <div className={PostItem.item}>
            <div className={PostItem.top}>
                <div className={PostItem.user}>
                <Image src={loggedUser.user_metadata?.avatar_url} width={40} height={40} style={{ borderRadius: '50%'}} alt={loggedUser.user_metadata?.name}/>
                <h2>{loggedUser.user_metadata?.name || loggedUser.user_metadata.email}</h2>
                </div>
            </div>
            {[...images].length > 0 ?
            <>
                <ImageSlider images={{urls: [...images]}} title={snippetRef as unknown as string}/>
            </>
            :
            <div className={PostItem.image}>
            <label htmlFor="image">
                <Image
                fill
                priority={false}
                style={{
                    cursor: 'pointer'
                }}
                sizes="
                "
                src={picture}
                alt={'post image'}/>
            </label>
            </div>
            }
            <div className={PostItem.action}>
                <RiHeartAddLine className={PostItem.icon}/>
                <TfiCommentAlt className={PostItem.icon}/>
                <TfiLocationArrow className={PostItem.icon}/>
            </div>
            <div className={PostItem.bottom}>
            <div className={PostItem.likesandusername}>
                <p className={PostItem.likes}>&#8734; <b>likes</b></p>
                <div style={{
                textDecoration: 'none',
                color: 'lightgreen'
                }} className={PostItem.username}><h3>{loggedUser.user_metadata.name}</h3></div>
            </div>
            <p><input name='snippet' onChange={(e) => setSnippetRef(e.target.value)} className={formStyles.input} type='text' required placeholder="enter your snippet here..."/></p>
            <small>{format(new Date(), "'Today is' eeee")}</small>
            <input type="file" name="image" id="image" hidden onChange={(e) => uploadHandler(e,loggedUser)}  accept=".png, .jpg, .jpeg"/>
            <button type="submit" className={formStyles.submitButton} disabled={images.size >= 10}>Publish</button>
            </div>
        </div>
        }
    </form>
  )
}