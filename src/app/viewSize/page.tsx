'use client'
import React from 'react'
import styles from './page.module.scss'
import useBodyReSize from '@/model/hooks/useBodyResize'
import useReSize from '@/model/hooks/useResize'

type Props = {}

// server hydration 무시해라
const page = (props: Props) => {
  // 데이터를 읽어와서 렌더링
  // image blob 얻어서 렌더링
  // video blob 얻어서 렌더링
  const [winWidth, winHeigth] = useBodyReSize()
  const { width, height, ref } = useReSize()

  return (
    <main className={styles.wrap}>
      <div ref={ref} className={styles.test}>
        <p>window Width : {`${winWidth}`}</p>
        <p>window Heigth : {`${winHeigth}`}</p>
        <p>box width : {`${width}`}</p>
        <p>box height : {`${height}`}</p>
        <p>view height : {`${typeof screen !== 'undefined' ? screen.width : 0}`}</p>
        <p>view height : {`${typeof screen !== 'undefined' ? screen.height : 0}`}</p>
        <p>yghyh</p>
      </div>
      {/* <div className={styles.test2}>user 정보</div> */}
    </main>
  )
}

export default page
