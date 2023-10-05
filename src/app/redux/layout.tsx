import React from 'react'
import ReduxProvider from '@/repository/provider/reduxProvider'

type Props = {
  children: React.ReactNode
}

const layout = ({ children }: Props) => {
  return (
    <div>
      <ReduxProvider>{children}</ReduxProvider>
    </div>
  )
}

export default layout
