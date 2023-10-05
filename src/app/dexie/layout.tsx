import React from 'react'
import User from './User'
import RoundNav from './Round'
import MatchUpNav from './MatchUp'
import Setting from './Setting'
import Update from './Update'
import styles from './layout.module.scss'

type Props = {
  children: React.ReactNode
}

const layout = ({ children }: Props) => {
  return (
    <div>
      <h1>토너먼트</h1>
      {children}
      <div className={styles.nav}>
        <User />
        <RoundNav />
        <MatchUpNav />
        <Setting />
        <Update />
      </div>
    </div>
  )
}

export default layout
