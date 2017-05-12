import React from 'react'
import { connect } from 'react-redux'

import Product from '../components/Product'

const ProductList = ({ isFetching, page, items }) => {
  return (
    isFetching ? null :
    <main>
      <section><h1>Products</h1></section>
      {items.length > 0 ?
        <section>
          {items.map(item => (
            <Product
              key={item._id}
              item={item}
            />
          ))}
        </section>
        :
        <section><h3>No items yet</h3></section>
      }
    </main>
  )
}

const mapStateToProps = (state, ownProps) => {
  const isFetching = state.cards.isFetching
  const items = isFetching ? null : state.products.items
  return {
    isFetching,
    items
  }
}

export default connect(mapStateToProps)(ProductList)
