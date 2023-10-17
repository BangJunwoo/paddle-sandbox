'use client'
import React, { useState, useEffect } from 'react'
import { openCart, deleteCart } from '@/repository/api/XsollaClient'
import { paths } from '@/repository/@types/xsollaStore'

type Test = NonNullable<
  paths['/v2/project/{project_id}/cart']['get']['responses']['200']['content']['application/json']
>

type Props = {}

type SKU = string

const CartDiv = (props: Props) => {
  const [load, setLoad] = useState(false)
  const [cart, setCart] = useState<Test>({})
  useEffect(() => {
    const getData = async () => {
      const data = await openCart()
      setLoad(() => true)
      setCart(() => data)
    }
    getData()
  }, [])
  if (load === false) return <div>loading...</div>
  return (
    <div>
      장바구니는 전역에 선언할 것이고 Dexie를 쓸껀데 이유는 장바구니 데이터 저장에 대한 로컬 저장이 있어야 데이터 유지가
      되고 프로바이더 없이 저장소에 접근할 수 있음
      <p>아이디 : {cart.cart_id}</p>
      <p>가격 : {JSON.stringify(cart.price)}</p>
      <p>무료구매 가능 여부 : {cart.is_free}</p>
      <p>장바구니 상품 : {JSON.stringify(cart.items, null, 4)}</p>
      <p>적용된 프로모션들 : {JSON.stringify(cart.promotions)}</p>
      <button
        onClick={() => {
          deleteCart()
        }}
      >
        장바구니 비우기
      </button>
    </div>
  )
}

export default CartDiv
