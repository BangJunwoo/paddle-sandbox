import React from 'react'

type Props = {
  children: React.ReactNode
}

const layout = ({ children }: Props) => {
  return (
    <div>
      <h1>토너먼트</h1>
      {children}
    </div>
  )
}

export default layout
