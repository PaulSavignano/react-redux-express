import React from 'react'

import ProductItem from './ProductItem'

const ProductList = ({ items }) => (
  items.length ?
  <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
    {items.map(item => (
      <ProductItem
        key={item._id}
        item={item}
      />
    ))}
  </div>
  :
  <section><h3>No items yet</h3></section>
)

export default ProductList
