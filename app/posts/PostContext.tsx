import { User } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import {ChangeEvent, createContext, useContext, useState} from 'react'
import { supabase } from '../../lib/supabase'
import { notification } from 'antd'
interface PostContextValue {
    paths: Set<string>
    images: Set<string>
    publishPost: (body: string, user: User) => Promise<void>
    uploadPhoto: ({e,user}: {e: ChangeEvent<HTMLInputElement>, user: User}) => Promise<void>
    removePhoto: ({path}: {path: string}) => void
    getPhotosURLs: ({path}: {path:string}) => void
    cancelAddingPost: () => void
}
const PostContext = createContext({} as PostContextValue)
export function usePostContext() {
    return useContext(PostContext)
}
export function PostContextProvider({children}:{children: React.ReactNode}) {
    const router = useRouter()
    const [paths,setPaths] = useState<Set<string>>(new Set())
    const [images,setImages] = useState<Set<string>>(new Set()) 

            const publishPost = async (body: string, user: User) => {
                const { error } = await supabase
                .from('posts')
                .insert({ 
                    snippet: body,
                    image_directory: {"urls": [...images]},
                    post_author: user.id,
                })
                if(error) console.log(error)
                else {
                    notification.success({
                        message: 'Successfully added post',
                        description: 'Redirecting to home page...'
                    })
                    router.push("/")
                }
            }
        const uploadPhoto = async( {e,user}: {e: ChangeEvent<HTMLInputElement> , user: User}) => {
            if(!e.target.files){
                return 
            }
                const file = e.target.files[0]
                const {data,error} = await supabase
                .storage
                .from('profiles')
                .upload(`${user.id}/${file.name}`, file, {
                    upsert: true
                })
                if(error) {
                    console.log(error)
                }
                if(data){
                setPaths(new Set([...paths, data.path]))
                getPhotosURLs({path: data.path})
                }
                else {
                setPaths(new Set([...paths, `${user.id}/${file.name}`]))
                getPhotosURLs({path: `${user.id}/${file.name}`})
                }
        }
            const getPhotosURLs = async ({path}: {path: string}) => {
                const { data } = supabase
                .storage
                .from('profiles')
                .getPublicUrl(path)
                const url = new URL(data.publicUrl)
                setImages(new Set([...images, url.href]))
            }
            const removePhoto = ({path}: {path:string}) => {
                const newPhotoUrls = [...images].filter((image) => image !== path)
                setImages(new Set(newPhotoUrls))
            }
            const cancelAddingPost = () => {
                setImages(new Set())
                setPaths(new Set())
                router.push('/')
            }
            const value = {
                uploadPhoto,
                getPhotosURLs,
                publishPost,
                removePhoto,
                cancelAddingPost,
                paths,
                images   
            }
            return (
                <PostContext.Provider value={value}>
                    {children}
                </PostContext.Provider>        
                )
        }