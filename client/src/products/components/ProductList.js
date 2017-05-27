import React from 'react'

import ProductItem from './ProductItem'

const ProductList = ({ items }) => (
  !items.length ? null :
  <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
    {items.map(item => (
      <ProductItem
        key={item._id}
        item={item}
      />
    ))}
  </div>
)

export default ProductList
