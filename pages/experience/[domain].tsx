import React from 'react'
import Image from 'next/image';
export const getStaticPaths = async () => {
    const res = await fetch(`https://api.thecompaniesapi.com/v1/companies/`)
    const data = await res.json();
    const paths = data.companies.map((path: { domain: { toString: () => any; }; }) => {
        return {
            params: {domain: path.domain.toString()}
        }
    })
    return {
        paths,
        fallback: false
    }
} 
export const getStaticProps = async (path: { params: { domain: any; }; }) => {
    const domain = path.params.domain
    const res = await fetch(`https://api.thecompaniesapi.com/v1/companies/${domain}`, {
        headers: {
            'Authorization': `Basic ${process.env.API_KEY}`
        }
        })
    const data = await res.json()
    return { 
        props: {workplace: data}
    }
}
const Details = ({workplace}: any) => {
  return (
    <div>
        <h1>{workplace.name}</h1>
        <Image src={workplace.logo} width={200} height={200} alt="logo"/>
        <p>{workplace.decription}</p>
    </div>
  )
}

export default Details