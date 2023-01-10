import React from 'react';
import styles from '../../styles/Styles.module.css';
import Link from 'next/link';
export const getStaticProps = async () => {
    const res = await fetch('https://api.thecompaniesapi.com/v1/companies');
    const data = await res.json()
    return {
        props: {companies: data.companies}
    }
} 

const Index = ({companies}: any) => {
  return (
    <section className={styles.center}>
      <ul>
      {companies.map((company: any) => (
        <li key={company.id}>
          <Link href={`/experience/${company.domain}`} >
            {company.name}
          </Link>
        </li>
      ))}
      </ul>
    </section>
  )
}

export default Index