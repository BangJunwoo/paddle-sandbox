import React from 'react'
import Link from 'next/link'
import CartDiv from './Cart'
// import XsollaLoginProvider from '@/repository/provider/xsollaLogin'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>
        <Link href="/xsolla">Home</Link>
        ------
        <Link href="/xsolla/shop">Shop</Link>
        {/* <Link href='/xsolla'>Home</Link> */}
      </div>
      {children}
      <CartDiv />
    </>
  )
}

export default layout
