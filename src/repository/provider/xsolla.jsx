'use client'
import React, { useState, createContext, useEffect } from 'react'
import Script from 'next/script'

export const PaddleContext = createContext(false)

const paddleProvider = ({ children, access_token }) => {
  const [load, setLoad] = useState(false)
  // const router = useRouter() state 등의 스크립트가 살아있어서 원하는 동작이 되지 않음
  const isAccess = access_token === '' || access_token == null
  const options = {
    access_token,
    sandbox: true, //TODO please do not forget to remove this setting when going live
    childWindow: {
      target: '_blank',
    },
  }
  useEffect(() => {
    console.log('effect', access_token, load)
    if (load) {
      // 스크립트가 불러와져있고 불러와졌다는 상태를 저장한 스크립트도 살아있는 상태
    } else {
      // 리소스는 살아있고 , 상태 값은 사라져 있어서 전역 변수만 남은 상태 > 이미 다른 값으로 init 됬기 때문에 새로고침 해야함
      if ('XPayStationWidget' in window && !isAccess) window.location.reload()
    }
  }, [access_token])
  if (access_token === '' || access_token == null) return <div>loading...</div>

  return (
    <>
      <Script
        id="xsolla-paystation-script"
        src="//cdn.xsolla.net/embed/paystation/1.2.7/widget.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('load token', JSON.stringify(options))
          // XPayStationWidget.init(options)
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
