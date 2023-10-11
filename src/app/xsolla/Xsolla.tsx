'use client'
import React, { useEffect } from 'react'

type Props = {}

const Xsolla = (props: Props) => {
  return (
    <div>
      <div id="xl_auth">a</div>
      <button
        onClick={async () => {
          const { Widget } = await import('@xsolla/login-sdk')
          const xl = new Widget({
            projectId: '432091',
            preferredLocale: 'en_US',
          })
          xl.mount('xl_auth')
          xl.open()
        }}
      >
        Babka Login Popup
      </button>
    </div>
  )
}

export default Xsolla
