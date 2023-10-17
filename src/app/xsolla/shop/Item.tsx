'use client'
import React from 'react'
import styles from './Item.module.scss'
import { paths } from '@/repository/@types/xsollaStore'
import Image from 'next/image'
type Test = NonNullable<
  paths['/v2/project/{project_id}/items']['get']['responses']['200']['content']['application/json']['items']
>[number]

const Item = (props: Test) => {
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
        />

        <button className={styles.button} onClick={() => {}}>
          Buy Now!
        </button>
      </div>
    </div>
  )
}

export default Item
