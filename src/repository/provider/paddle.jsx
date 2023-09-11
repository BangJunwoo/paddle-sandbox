'use client'
import React, { useState, createContext } from 'react'
import Script from 'next/script'

export const PaddleContext = createContext(false)

// import { useContext } from 'react'
// import { PaddleContext } from '@/repository/provider/paddle'
// const load = useContext(PaddleContext)

const paddleProvider = ({ children }) => {
  const [load, setLoad] = useState(false)
  return (
    <>
      <Script
        id="paddle-script"
        src="https://cdn.paddle.com/paddle/v2/paddle.js"
        strategy="afterInteractive"
        onLoad={() => {
          Paddle.Environment.set('sandbox')
          Paddle.Setup({
            seller: 14403,
            pwAuth: '00000000000000000000000000000000',
            eventCallback: function (data) {
              console.log('paddle', data)
            },
          })
          setLoad(true)
        }}
      ></Script>
      <PaddleContext.Provider value={load}>{children}</PaddleContext.Provider>
    </>
  )
}

export default paddleProvider
