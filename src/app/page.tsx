'use client'

import styles from './page.module.css'
import { useContext } from 'react'
import { PaddleContext } from '@/repository/provider/paddle'
import { useAboutGrent } from '@/model/apiUtils/useFetchAbort'

const Home = () => {
  const load = useContext(PaddleContext)
  const data = {}
  const a = useAboutGrent(data)
  return (
    <main className={styles.main}>
      <span className={styles.icon}>
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
      </button>
    </main>
  )
}

export default Home
