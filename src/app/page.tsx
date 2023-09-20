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
      hello: {`${load}`}
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
