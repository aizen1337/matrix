import React from 'react';
import styles from '../../styles/Styles.module.css';
import Link from 'next/link';
interface Post {
  userId: number,
  id: number,
  title: string,
  body: string
}
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, { cache: 'no-store' });
    if(!res.ok) {
      throw new Error("Failed to fetch data")
    }
    const data = await res.json()
    return data as Post[]
} 
export default async function Index() {
  const posts = await getPosts()
  return (
    <section className={styles.center}>
      {posts?.map((post: Post) => (
          <section className={styles.item} key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.userId}</p>
            <Link className={styles.itemLink} href={`/posts/${post.id}`}>Read more</Link>
          </section>
      ))}
    </section>
  )
}