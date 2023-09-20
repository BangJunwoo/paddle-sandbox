import React from 'react'
import Praddle from '@/repository/provider/paddle'

type Props = {
  children: React.ReactNode
}

const layout = ({ children }: Props) => {
  return <Praddle>{children}</Praddle>
}

export default layout
