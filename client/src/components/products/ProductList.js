import React from 'react'
import Product from './Product'

const ProductList = (props) => {
  console.log(props)
  return (
    <div>
      {props.products.map(product => (
        <Product key={product.name} {...product} />
      ))}
    </div>
  )
}

export default ProductList
