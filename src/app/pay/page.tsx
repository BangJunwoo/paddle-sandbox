import React from 'react'
import ProductList from './ProductList'
import SelectList from './SelectList'
import BuyButten from './Buybutten'

type Props = {}

const page = (props: Props) => {
  return (
    <main>
      <h2>inline</h2>
      <ProductList></ProductList>
      <SelectList></SelectList>
      <BuyButten></BuyButten>
    </main>
  )
}

export default page
