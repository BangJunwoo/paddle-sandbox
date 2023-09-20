'use client'

import React, { useContext } from 'react'
import Data from '@/static/PAYMENTS.json'

import { PaddleContext } from '@/repository/provider/paddle'

type Props = {}

const itemsList = [
  {
    priceId: Data.products[0].price,
    quantity: 1,
  },
]

const Buybutten = (props: Props) => {
  const load = useContext(PaddleContext)
  return (
    <div>
      {`${load}`}
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
