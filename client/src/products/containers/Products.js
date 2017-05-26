import React from 'react'
import { connect } from 'react-redux'

import ProductList from '../components/ProductList'

const Products = ({ isFetching, items }) => {
  return (
    isFetching ? null :
    <section>
      <h1>Products</h1>
      <ProductList items={items} />
    </section>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.products.isFetching,
  items: state.products.items
})

export default connect(mapStateToProps)(Products)
