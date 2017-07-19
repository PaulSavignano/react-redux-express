import React from 'react'
import { connect } from 'react-redux'

import ProductItem from './ProductItem'

const ProductPage = ({ isFetching, item }) => (
  !isFetching &&
  <section>
    <ProductItem componentId={item._id} fullWidth={true} />
  </section>
)

const mapStateToProps = ({ products: { isFetching, items } }, { params: { productId } }) => {
  return {
    isFetching,
    item: items.find(item => item._id === productId)
  }
}

export default connect(mapStateToProps)(ProductPage)
