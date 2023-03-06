'use client'
import React, { useEffect } from "react"
import { supabase } from "../../../lib/supabase"
import { ChangeEvent, useRef,useState } from "react"
import { TfiMore, TfiCommentAlt, TfiLocationArrow, TfiSave, TfiPlus, TfiTrash  } from "react-icons/tfi"
import {RiHeartAddLine} from 'react-icons/ri'
import { User } from '@supabase/supabase-js'
import Image from "next/image"
import PostItem from '../Post.module.css';
import { useRouter } from "next/navigation"
import ImageSlider from "../ImageSlider"
import {format} from 'date-fns'
import picture from './picture.jpg'
import formStyles from './Form.module.css'
export const PostForm = ({loggedUser}: {
    loggedUser: User
}) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const snippetRef = useRef<HTMLInputElement>(null)
    const bodyRef = useRef<HTMLInputElement>(null)
    const [paths,setPaths] = useState<Set<string>>(new Set())
    const [images,setImages] = useState<Set<string>>(new Set())
    const router = useRouter()
    useEffect(() => {
      console.log({paths:paths})
      console.log({images:images})
    },[paths,images])
    const uploadPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files){
            return 
        }
        const file = e.target.files[0]
            const {data,error} = await supabase
            .storage
            .from('profiles')
            .upload(`${loggedUser.id}/${file.name}`, file, {
                upsert: true
            })
            if(error) {
                console.log(error)
            }
            if(data){
            setPaths(new Set([...paths, data.path]))
            getPhotosURLs(data.path)
            }
            else {
            setPaths(new Set([...paths, `${loggedUser.id}/${file.name}`]))
            getPhotosURLs( `${loggedUser.id}/${file.name}`)
            }
    }
    const getPhotosURLs = async (path: string) => {
        const { data } = supabase
        .storage
        .from('profiles')
        .getPublicUrl(path)
        const url = new URL(data.publicUrl)
        setImages(new Set([...images, url.href]))
    }
    const uploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        await uploadPhoto(e)
    }
    const submitFunction = async(e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const values = Object.fromEntries(formData)
        if(!loggedUser || !titleRef || !bodyRef || !snippetRef || !e.target.files)
        {
            console.error("Fields are empty or access denied")
        }
        const publishPost = async () => {
            const { error } = await supabase
            .from('posts')
            .insert({ 
                body: values.body,
                title: values.title,
                snippet: values.snippet,
                image_directory: {"urls": [...images]},
                post_author: loggedUser.id,
            })
            if(error) console.log(error)
            else {
                console.log("Succesfully added")
                router.push("/")
            }
        }
        publishPost()
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
                <ImageSlider images={{urls: [...images]}} title={titleRef as unknown as string}/>
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
            <input type="file" name="image" id="image" hidden onChange={(e) => uploadHandler(e)}  accept=".png, .jpg, .jpeg"/>
            <button type="submit" className={formStyles.submitButton} disabled={[images].length >= 10}>Opublikuj</button>
            </div>
        </div>
    </form>
  )
}