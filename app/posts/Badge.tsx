'use client'
import React from 'react'
import styles from './Post.module.css'
type Props = {
    count: number
}
const Badge = (props: Props) => {
  return (
    <div className={props.count > 0 ? styles.badge : styles.hidden}>
        {props.count}
    </div>
  )
}

export default Badge