import React, {useState} from 'react'
import {TfiArrowRight,TfiArrowLeft,} from 'react-icons/tfi';
import { PostImages } from './Post';
import styles from './Post.module.css';
import Link from 'next/link'
import Image from 'next/image';
type Props = {
    images: PostImages,
    id?: number,
    title?: string,
    publishedPost?: boolean, 
}
const ImageSlider = (props: Props) => {
  type Action = 'decrease' | 'increase'
  const counter = props.images.urls.length
  var [count,setCount] = useState(1);
  const setImage = (action: Action) => {
    if(action == 'decrease' && (count > 1)) {
       setCount(count-1)
    }
    else if(action == 'increase' && (count < counter)) {
       setCount(count+1)
    }
  }
  return (
    <>
    <div className={styles.image}>
        <div className={counter > 1 ? styles.imageBar : styles.hidden}>
        <TfiArrowLeft onClick={() => setImage('decrease') } className={count == 1 ? styles.hidden : ''} />
        {`${count}/${counter}`}
        <TfiArrowRight onClick={() => setImage('increase')} className={count == counter ? styles.hidden : ''}/>
        </div>
        {props.publishedPost ? 
        <Link style={{
        textDecoration: 'none',
        }} href={`/posts/${props.id}`}>
        <Image 
        src={props.images.urls[count-1]}
        fill
        priority={false}
        sizes="
        "
        placeholder={"empty"}
        alt={props.title || 'post image'}/>
        </Link> 
        :
        <Image 
        src={props.images.urls[count-1]}
        fill
        priority={false}
        sizes="
        "
        placeholder={"empty"}
        alt={props.title || 'post image'}/>
      }
    </div>
    </>
  )
}

export default ImageSlider