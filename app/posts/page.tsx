import React from 'react';
import styles from '../../styles/Styles.module.css';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

async function getPosts() {
    const {data} = await supabase.from('posts').select();
    return data as Post[]
} 
export default async function Index() {
  const posts = await getPosts()
  return (
    <section className={styles.center}>

    </section>
  )
}