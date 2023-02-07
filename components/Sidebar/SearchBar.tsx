'use client'
import React, {useState} from 'react'
import styles from './Sidebar.module.css';
import Image from 'next/image';
const SearchBar = () => {
    interface SearchResultItem {
      title: string,
      snippet: string,
      image: string
    }
    const [query,setQuery] = useState<SearchResultItem[]>([]);
    async function searchPost(e: any) {
        const query = e.target.value;
        if (query.length > 3) {
            const params = new URLSearchParams({query})
            const response = await fetch(`/api/search-posts?${params}`)
            const result = await response.json()
            console.log(result.response)
            setQuery(result.response)
        }
    }
  return (
    <>
    <input
    onChange={searchPost}
    type="text"
    className={styles.searchBar}
    />
      {query.length > 0 && 

        <ul className={styles.searchResults}>
        {
        query.map((searchResult: SearchResultItem, index: number) => (
        <li key={index} className={styles.searchResult}>
          <h1>{searchResult.title}</h1>
          <p>{searchResult.snippet}</p>
          <Image src={searchResult.image} width={20} height={20} alt={searchResult.title}/>
        </li>
        ))
        }
        </ul>
      }
    </>
  )
}

export default SearchBar