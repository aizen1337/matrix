'use client'
import React from "react"
import { supabase } from "../../../lib/supabase"
import { ChangeEvent, useRef } from "react"
import { TfiMore, TfiCommentAlt, TfiLocationArrow, TfiPlus, TfiTrash  } from "react-icons/tfi"
import {RiHeartAddLine} from 'react-icons/ri'
import { User } from '@supabase/supabase-js'
import Image from "next/image"
import PostItem from '../Post.module.css';
import { useRouter } from "next/navigation"
import ImageSlider from "../ImageSlider"
import {format} from 'date-fns'
import picture from './picture.jpg'
import formStyles from './Form.module.css'
import { usePostContext } from "../PostContext"
export const PostForm = ({loggedUser}: {
    loggedUser: User
}) => {
    const {uploadPhoto,publishPost,images} = usePostContext();
    const snippetRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const uploadHandler = async (e: ChangeEvent<HTMLInputElement>, user: User) => {
        await uploadPhoto({e, user})
    }
    const submitFunction = async(e: any) => {
        e.preventDefault()
        if(!loggedUser || !snippetRef ||  !e.target.files)
        {
            console.error("Fields are empty or access denied")
        }
        publishPost(snippetRef as unknown as string, loggedUser)
    }
  return (
    <form onSubmit={submitFunction}>

        <div className={PostItem.item}>
            <div className={PostItem.top}>
                <div className={PostItem.user}>
                <Image src={loggedUser.user_metadata?.avatar_url} width={40} height={40} style={{ borderRadius: '50%'}} alt={loggedUser.user_metadata?.name}/>
                <h2>{loggedUser.user_metadata?.name || loggedUser.user_metadata.email}</h2>
                </div>
                <TfiMore/>
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
                <label htmlFor="image">
                                <div>
                                Add some more <TfiPlus/>
                                </div>
                                <div className={PostItem.delete}>
                                or delete this <TfiTrash/>
                                </div>
                 </label>
            </div>
            <div className={PostItem.bottom}>
            <div className={PostItem.likesandusername}>
                <p className={PostItem.likes}>&#8734; <b>likes</b></p>
                <div style={{
                textDecoration: 'none',
                color: 'lightgreen'
                }} className={PostItem.username}><h3>{loggedUser.user_metadata.name}</h3></div>
            </div>
            <p><input name='snippet' ref={snippetRef} className={formStyles.input} type='text' required placeholder="your snippet..."/></p>
            <small>{format(new Date(), "'Today is' eeee")}</small>
            <input type="file" name="image" id="image" hidden onChange={(e) => uploadHandler(e,loggedUser)}  accept=".png, .jpg, .jpeg"/>
            <button type="submit" className={formStyles.submitButton} disabled={[images].length >= 10}>Opublikuj</button>
            </div>
        </div>
    </form>
  )
}