import Link from 'next/link'
import styles from '../styles/Styles.module.css'
export default function Home() {
  return (
    <>  
        <main className={styles.home}>
          <h1>Hi, I am Radosław Rumian</h1>
          <h2>Welcome to my portfolio!</h2>
          <p>As a self-taught developer with over 20 years of experience, I have a wealth of knowledge and skills that I have acquired through years of hands-on experience and a relentless drive to stay up-to-date with the latest technologies.

Throughout my career, I have worked on a wide range of projects, from small, single-page websites to large-scale enterprise applications. I have experience with a variety of programming languages and frameworks, including Python, JavaScript, React, and Angular.

One of my greatest strengths as a developer is my ability to quickly learn new technologies and programming languages. I am always eager to learn and improve my skills, and I am never satisfied with my current level of knowledge.

In addition to my technical skills, I am also a highly organized and efficient worker. I am able to manage multiple projects simultaneously and deliver high-quality results on time and within budget.

If you are looking for a highly skilled, self-taught developer with a proven track record of success, then I would be an excellent candidate for your project. Whether you need a new website, an enterprise application, or any other type of software development project, I am confident that I have the skills and experience necessary to deliver outstanding results.
          </p>
          <h4>Click here to see my <Link href="/posts"><br></br>blog</Link></h4>
        </main>
    </>
  )
}
