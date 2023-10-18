'use client'
import React, { useState } from 'react'
import styles from './Item.module.scss'
import Image from 'next/image'
import { paths } from '@/repository/@types/xsollaStore'
import { addCart, openCart } from '@/repository/api/XStoreFetchClient'
import { db } from '@/model/dexie/dexie'
type Test = NonNullable<
  paths['/v2/project/{project_id}/items']['get']['responses']['200']['content']['application/json']['items']
>[number]

const Item = (props: Test) => {
  const [quantity, setQuantity] = useState(1)
  return (
    <div className={styles.wrap}>
      <div>image</div>
      <div className={styles.box}>
        <span className={styles.label}>{props.type}</span>
        <span className={styles.sku}>{props.item_id}</span>
        <span className={styles.label}>name : {props.name}</span>
        <span className={styles.label}>price : {JSON.stringify(props.price)}</span>
        <span className={styles.label}>virtual_prices : {JSON.stringify(props.virtual_prices)}</span>
        <span className={styles.label}>description : {props.description}</span>
        <Image
          alt={props.name == null ? 'null' : props.name}
          src={props.image_url == null ? '/next.svg' : props.image_url}
          width={200}
          height={200}
          style={{ objectFit: 'cover' }}
          unoptimized
        />
        <input
          type="number"
          defaultValue={quantity}
          onChange={(e) => setQuantity(Number(e.currentTarget.value))}
        ></input>
        <button
          className={styles.button}
          onClick={async () => {
            if (props.sku) {
              await addCart(props.sku, quantity)
              const data = await openCart()
              db.cart.put(data)
            }
          }}
        >
          Add Cart!
        </button>
      </div>
    </div>
  )
}

export default Item
