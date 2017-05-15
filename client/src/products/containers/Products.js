import React from 'react'
import { connect } from 'react-redux'

import ProductList from '../components/ProductList'

const Products = ({ isFetching, items }) => {
  return (
    isFetching ? null :
    <main>
      <section><h1>Products</h1></section>
      <ProductList items={items} />
    </main>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.products.isFetching,
  items: state.products.items
})

export default connect(mapStateToProps)(Products)
