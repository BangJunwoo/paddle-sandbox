'use client'
import React, { useState, createContext } from 'react'
import Script from 'next/script'

export const PaddleContext = createContext(false)

// import { useContext } from 'react'
// import { PaddleContext } from '@/repository/provider/paddle'
// const load = useContext(PaddleContext)

var s = document.createElement('script')
s.type = 'text/javascript'
s.async = true
s.src = 'https://static.xsolla.com/embed/paystation/1.0.7/widget.min.js'
s.addEventListener(
  'load',
  function (e) {
    XPayStationWidget.init(options)
  },
  false
)

const options = {
  access_token: '98509a95fe6164987d9e512dc88904c1618cf96b', //TODO use access token, received on previous step
  sandbox: true, //TODO please do not forget to remove this setting when going live
}
const paddleProvider = ({ children }) => {
  const [load, setLoad] = useState(false)

  return (
    <>
      <Script
        id="xsolla-paystation-script"
        src="https://static.xsolla.com/embed/paystation/1.0.7/widget.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          XPayStationWidget.init(options)
          setLoad(true)
        }}
      ></Script>
      <PaddleContext.Provider value={load}>
        <button data-xpaystation-widget-open>Buy Credits</button>
        {children}
      </PaddleContext.Provider>
    </>
  )
}

export default paddleProvider
