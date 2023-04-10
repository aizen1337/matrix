import React, { useEffect } from 'react'
import { List, Input, Avatar, Modal, Button, Space, notification } from 'antd'
import { formatDistance } from 'date-fns'
import { supabase } from '../../lib/supabase'
import { Metadata } from './Post'
import {TfiTrash, TfiUpload} from 'react-icons/tfi'
import Link from 'next/link'
import { useUser } from '@supabase/auth-helpers-react'
import styles from './Post.module.css'
import DeleteModal from './DeleteModal'
export interface Comment {
  id: number,
  post_id: number,
  comment: string,
  added: string,
  comment_author: string,
  user_id: string,
  email: string,
  metadata: Metadata
}
const CommentsModal = ({comments, open, onClose, id, setter}: {comments: Comment[], open: boolean, onClose: any, id: number, setter: React.Dispatch<React.SetStateAction<any>>}) => {
  const currentUser = useUser()
  const [commentBody, setCommentBody] = React.useState<string>("")
  const [deleteModal,setDeleteModal] = React.useState(false)
  useEffect(()=> {
    const top = document.getElementById('list')
    top?.scrollIntoView({behavior: 'smooth'})
  }, [comments, setter])
  const publishComment = async () => {
    const {error} =  await supabase.from('comments').insert(
      {
        post_id: id,
        comment: commentBody,
        comment_author: currentUser?.id
      })
      if(error) {
        notification.error({
          message: 'Error occurred while adding comment',
        })
      }
      else {
        notification.success({
          message: 'Successfully added comment',
          description:
            `Your comment: ${commentBody}`
        })
  
        setter(id)
      }
    }
  return (
    <Modal open={open}
    centered
    title="Comments"
    onCancel={onClose}
    footer={null}
    className={styles.modal}
    bodyStyle={{
      background: '#262626',
      borderRadius: '1rem'
    }}
    style={{
      background: '#262626'
    }}
    >
      <div style={{
        width: '20rem',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
      id='list'
      >
      {comments.length > 0 ?
      <List
      dataSource={comments}
       renderItem={(item) => (
        <List.Item
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center'
        }}>
          <List.Item.Meta
            avatar={<Avatar src={item.metadata.picture} />}
            title={<Link href={`/account/${item.comment_author}`}
            style={{
              color: 'white'
            }} >{item.metadata.full_name}</Link>}
            description={<p 
              style={{
                color: 'white'
              }}>{item.comment}</p>}
            />
            <small
            style={{
            color: 'gray', 
            display: 'flex',
            flexDirection: 'column',
            }}>{formatDistance(new Date(item.added), new Date(), {addSuffix: true})}</small>
            {item.comment_author === currentUser?.id && 
            <TfiTrash 
            onClick={() => setDeleteModal(true)}
            style={{
              color: 'crimson',
              fontSize: '2rem',
              marginLeft: "auto",
              cursor: 'pointer'
            }}
            /> }
            <DeleteModal onClose={() => setDeleteModal(false)} open={deleteModal} id={item.id} content={"comment"} comment_author={item.comment_author} setter={setter}/>
        </List.Item>
        )}
        />
        :
        <h1 style={{color: 'white', width: '20rem'}}>No one commented this post yet...</h1>
       }
      {currentUser ?
        <Space.Compact style={{
          margin: '1rem'
        }}>
          <Input 
          placeholder="Comment this post..." 
          onChange={(e) => setCommentBody(e.target.value)}/> 
          <Button
          onClick={() => publishComment()} 
          style={{
            background: 'limegreen',
            color: 'black'
          }}
          disabled={commentBody.length === 0}><TfiUpload/></Button>
        </Space.Compact>
      :
      <h4  style={{color: 'white', width: '20rem'}}>You have to login to publish comments</h4>
      }
      </div>
    </Modal>
  )
}

export default CommentsModal