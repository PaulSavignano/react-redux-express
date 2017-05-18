import React from 'react'

import ProductItem from './ProductItem'

const ProductList = ({ items }) => (
  items.length ?
  <section>
    {items.map(item => (
      <ProductItem
        key={item._id}
        item={item}
      />
    ))}
  </section>
  :
  <section><h3>No items yet</h3></section>
)

export default ProductList
