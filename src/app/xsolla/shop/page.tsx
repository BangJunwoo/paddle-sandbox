import React from 'react'
import Item from './Item'
import { getItems } from '@/repository/api/anonymousXsollaStore'

type Props = {}

const page = async (props: Props) => {
  const aww = await getItems()
  const data = aww.items !== undefined ? aww.items : []

  return (
    <div>
      <div>
        {data.map((item) => (
          <Item key={item.item_id} {...item} />
        ))}
      </div>
    </div>
  )
}

export default page
