'use client'

import styles from './page.module.css'
import Link from 'next/link'

const Home = () => {
  return (
    <main className={styles.main}>
      <Link href="/xsolla">xsolla test</Link>
      {/* <span className={styles.icon}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a
      </span>
      <button
        onClick={() => {
          console.log(a)
        }}
      >
        test
      </button> */}
    </main>
  )
}

export default Home
