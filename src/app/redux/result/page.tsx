import React from 'react'
import Link from 'next/link'
import SettingInfo from './SettingInfo'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <Link href="/tournament">이전</Link>
      <SettingInfo />
    </div>
  )
}

export default page
