import React, { useState } from "react"
import { Drawer, Input, List, Avatar } from 'antd';
import styles from "./Sidebar.module.css"
import { supabase } from "../../lib/supabase";
import { User } from "../../app/account/[id]/page";
import Link from 'next/link'
type Props = {
    searchOpen: boolean
    onClose: (value: React.SetStateAction<boolean>) => void
}
const SearchDrawer = (props: Props) => {
    const [searchResult, setSearchResult] = useState<any>()
    async function search(e: any) {
        if(e.target.value.length > 2) {
        console.log(e.target.value)
        const {data,error} = await supabase.from('users').select()
        .textSearch('email', `${e.target.value}`, {
            type: 'phrase',
            config: 'english'
        })
        if(error) console.log(error)
        if(data) 
        {
        console.log(data)
        setSearchResult(data)
        }
        }
    }
  return (
    <Drawer onClose={() => props.onClose(false)} open={props.searchOpen} placement="left" zIndex={1000000000} 
    style={{
        background: '#262626',
    }}
    >
        <Input className={styles.drawerInput} placeholder="Search user via email"
        style={{
            background: '#262626',
            border: '1px solid limegreen',
            color: 'white'
        }}
        onChange={async (e) => await search(e)} />
        <List
        itemLayout="horizontal"
        dataSource={searchResult}
        renderItem={(item: User) => (
            <Link href={`/account/${item.user_id}`}>
            <List.Item>
            <List.Item.Meta
            avatar={<Avatar src={item?.metadata.picture} />}
            title={<h4 style={{color: 'white'}}>{item.metadata.full_name}</h4>}
            description={<small style={{color: 'limegreen'}}>@{item.email}</small>}
            />
            </List.Item>
        </Link>
        )}/>
    </Drawer>
  )
}

export default SearchDrawer