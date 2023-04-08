'use client'
import { PostContextProvider } from "./PostContext"
export default function PostLayout({
    children
}: {
    children: React.ReactNode,
})
{
    return (
    <PostContextProvider>
        {children}
    </PostContextProvider>
    )
}