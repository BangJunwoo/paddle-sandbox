import React from 'react'
import Link from 'next/link'
import Setting from './Setting'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <h2>설정창</h2>
      <Setting />
      <Link href="/tournament/result">결과</Link>
    </div>
  )
}

export default page
