import React from 'react'
import InnerComp from '@/view/components/cssTest/InnerComp'

type Props = {}

const page = (props: Props) => {
  return (
    <div className="main">
      <InnerComp styles={{ width: 'clamp(300px, 100vw, 1000px)' }} />
    </div>
  )
}

export default page
