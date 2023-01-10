import React from 'react'
import { useLayoutEffect } from 'react'
import { useRouter } from 'next/router'
const NotFound = () => {
    const router = useRouter()
    useLayoutEffect(() => {
        router.back()
    },[])
  return (
    <div>404</div>
  )
}

export default NotFound