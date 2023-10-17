'use client'
import { store } from '@/model/redux/store/store'
import { Provider } from 'react-redux'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const reduxProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>
}

export default reduxProvider
