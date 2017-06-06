import React from 'react'

import ProductItem from './ProductItem'

const ProductList = ({ products }) => (
  !products.length ? null :
  <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
    {products.map(product => (
      <ProductItem
        key={product._id}
        product={product}
      />
    ))}
  </div>
)

export default ProductList
