import React from 'react'
import Link from 'next/link'
import styles from './Sidebar.module.css'
type Props = {
    icon: React.ReactNode,
    name: string
    destination?: string,
    onClick?: any
}

const Icon = ({icon,destination,name, onClick}: Props) => {
  return (
    <li onClick={onClick}>
    {destination ? 
        <Link className={styles.anchor} href={destination as string}>
            <i className={styles.icon}>
                {icon}
            </i>
            <span className={styles.name}>{name}</span>
        </Link>
    :
        <div className={styles.anchor}>
            <i className={styles.icon}>
                {icon}
            </i>
            <span className={styles.name}>{name}</span>
        </div>
    }
    </li>
  )
}

export default Icon