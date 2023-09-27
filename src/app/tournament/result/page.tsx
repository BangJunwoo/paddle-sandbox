import React from 'react'
import Link from 'next/link'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <Link href="/tournament">이전</Link>
    </div>
  )
}

export default page
