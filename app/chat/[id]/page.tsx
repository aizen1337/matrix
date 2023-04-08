
import React from 'react'
import Chat from '../Chat'
export const dynamic='auto',
dynamicParams= true,
revalidate=0,
runtime='nodejs',
preferredRegion='auto'
const Page = ({params}: any) => {
  return (
        <Chat userId={params.id}/>
  )
}

export default Page