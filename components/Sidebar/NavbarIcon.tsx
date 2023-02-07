import React from 'react'
import Link from 'next/link'
import styles from './Sidebar.module.css'
type Props = {
    icon: React.ReactNode,
    name: string
    destination: string,
}

const NavbarIcon = ({icon,destination,name}: Props) => {
  return (
    <li>
    <Link className={styles.anchor} href={destination}>
        <i className={styles.icon}>{icon}</i>
        <span className={styles.name}>{name}</span>
    </Link>
    <span className={styles.tooltip}>{name}</span>
    </li>
  )
}

export default NavbarIcon