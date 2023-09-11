'use client'

import styles from './page.module.css'
import { useContext } from 'react'
import { PaddleContext } from '@/repository/provider/paddle'

const Home = () => {
  const load = useContext(PaddleContext)
  return <main className={styles.main}>hello: {`${load}`}</main>
}

export default Home
