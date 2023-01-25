"use client"
import React from 'react'
import Image from 'next/image';
export const getStaticPaths = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    const data = await res.json();
    const paths = data.map((path: { id: { toString: () => any; }; }) => {
        return {
            params: {id: path.id.toString()}
        }
    })
    return {
        paths,
        fallback: false
    }
} 
export const getStaticProps = async (path: { params: { id: any; }; }) => {
    const id = path.params.id
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const data = await res.json()
    return { 
        props: {post: data}
    }
}
const Details = ({post}: any) => {
  return (
    <div>
        <h1>{post.title}</h1>
        <Image src={"https://picsum.photos/200/300"} width={200} height={300} alt="logo"/>
        <p>{post.body}</p>
    </div>
  )
}

export default Details