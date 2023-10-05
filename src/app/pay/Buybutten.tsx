'use client'

import React, { useContext } from 'react'
import Data from '@/static/PADDLEPAYMENTS.json'

import { PaddleContext } from '@/repository/provider/paddle'

const itemsList = [
  {
    priceId: Data.products[0].price,
    quantity: 1,
  },
]

const Buybutten = () => {
  const load = useContext(PaddleContext)
  return (
    <div>
      {`로드 상태 : ${load}`}
      <a
        href="#"
        onClick={() => {
          Paddle.Checkout.open({
            settings: {
              displayMode: 'overlay',
              theme: 'dark',
              locale: 'ko',
            },
            items: itemsList,
          })
        }}
      >
        Buy now
      </a>
    </div>
  )
}

export default Buybutten
