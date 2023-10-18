'use client'
import React from 'react'
import { deleteCart, createOrder } from '@/repository/api/XStoreFetchClient'
import { useRouter } from 'next/navigation'
import { db } from '@/model/dexie/dexie'
import { useLiveQuery } from 'dexie-react-hooks'

const dexieDelete = () => {
  const c = db.cart.clear()
  return Promise.allSettled([c])
  // const is = a.every((v) => v.status === 'fulfilled')
}

const CartDiv = () => {
  const cart = useLiveQuery(() => db.cart.get('current'))
  const router = useRouter()

  if (cart === undefined) return <div>cart가 비었음</div>
  return (
    <div>
      {/* 장바구니는 전역에 선언할 것이고 Dexie를 쓸껀데 이유는 장바구니 데이터 저장에 대한 로컬 저장이 있어야 데이터 유지가
      되고 프로바이더 없이 저장소에 접근할 수 있음 */}
      <p>아이디 : {cart.cart_id}</p>
      <p>가격 : {JSON.stringify(cart.price)}</p>
      <p>무료구매 가능 여부 : {cart.is_free}</p>
      <p>장바구니 상품 : {JSON.stringify(cart.items, null, 4)}</p>
      <p>적용된 프로모션들 : {JSON.stringify(cart.promotions)}</p>
      <button
        onClick={() => {
          deleteCart()
          dexieDelete()
        }}
      >
        장바구니 비우기
      </button>
      <button
        onClick={async () => {
          const data = await createOrder()
          console.log('data', data)
          router.replace(`/xsolla/buy?token=${data.token}`)
          // router.replace(`https://sandbox-secure.xsolla.com/paystation4/?token=${data.token}`)
        }}
      >
        Buy Now!
      </button>
    </div>
  )
}

export default CartDiv
