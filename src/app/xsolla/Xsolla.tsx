'use client'
import React from 'react'
import xsollaIds from '@/XSOLLA.json'

const Xsolla = () => {
  return (
    <div>
      <div id="xl_auth">a</div>
      <button
        onClick={async () => {
          const { Widget } = await import('@xsolla/login-sdk')
          const xl = new Widget({
            projectId: xsollaIds.loginProjectId,
            preferredLocale: 'en_US',
          })
          xl.mount('xl_auth')
          xl.open()
        }}
      >
        Login
      </button>
    </div>
  )
}

export default Xsolla
