import React, {} from 'react'
import { Modal } from 'antd'
import styles from "./Post.module.css"
import { notification } from 'antd'
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../../lib/supabase'
type Props = {
    onClose:  React.Dispatch<React.SetStateAction<boolean>>
    open: boolean,
    id: number,
    post_author?: string,
    comment_author?: string,
    content: "post" | "comment",
    setter?: React.Dispatch<React.SetStateAction<any>>
}
const DeleteModal = (props: Props) => {
   const currentUser = useUser()
   async function deletePost() {
    if(currentUser && currentUser.id == props.post_author) {
      const {error} = await supabase.from('posts').delete().eq("id", props.id)
      if(error) {
        notification.error({
          message: 'Error occurred while deleting your post',
          description: error.message
        })
      }
      else {
        notification.success({
          message: "Post successfully deleted"
        })
      }
    }
  }
  async function deleteComment() {
    if(currentUser && currentUser.id == props.comment_author) {
      const {error} = await supabase.from('comments').delete().eq("id", props.id)
      if(error) {
        notification.error({
          message: 'Error occurred while deleting your comment',
          description: error.message
        })
      }
      else {
        notification.success({
          message: "Comment successfully deleted"
        })
        if(props.setter) {
        props.onClose(false)
        props.setter(props.id)
        }
      }
    }
  }
  return (
    <Modal
    open={props.open}
    centered
    title="Deleting post"
    onCancel={() => props.onClose(false)}
    onOk={() => {props.content == "post" ? deletePost() : deleteComment()}}
    className={styles.modal}
    bodyStyle={{
      background: '#262626',
      borderRadius: '1rem'
    }}
    style={{
      background: '#262626'
    }}>
        Do you really wish to delete this {props.content == "post" ? "post" : "comment"}
    </Modal>
  )
}

export default DeleteModal