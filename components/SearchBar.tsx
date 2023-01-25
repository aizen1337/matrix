'use client'
import React, {useState} from 'react'
const SearchBar = () => {
    const [query,setQuery] = useState();
    async function searchPost(e: any) {
        const query = e.target.value;
        if (query.length > 3) {
            const params = new URLSearchParams({query})
            const response = await fetch(`/api/search-posts?${params}`)
            const result = await response.json()
            console.log(result)
        }
    }
  return (
    <>
    <input
    onChange={searchPost}
    type="text"
    />
    </>
  )
}

export default SearchBar