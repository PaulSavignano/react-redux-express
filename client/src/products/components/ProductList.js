import React from 'react'
import { connect } from 'react-redux'
import Product from './Product'

const ProductList = ({ isFetching, products }) => (
  isFetching ? null : products.length > 0 ?
    <section>
      {products.map(product => (
        <Product
          key={product._id}
          {...product}
        />
      ))}
    </section>
  :
    <section><p>No products yet</p></section>
)

const mapStateToProps = (state) => {
  if (!state.products.isFetching) {
    return {
      isFetching: state.products.isFetching,
      products: state.products.items || [],
    }
  }
  return {
    isFetching: state.products.isFetching,
    products: []
  }
}

export default connect(mapStateToProps)(ProductList)
