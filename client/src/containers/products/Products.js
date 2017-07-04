import React from 'react'

import ProductList from '../components/ProductList'

const Products = ({ isFetching, section, products }) => {
  return (
    !isFetching &&
    <section>
      <ProductList products={products} />
    </section>
  )
}

export default Products
