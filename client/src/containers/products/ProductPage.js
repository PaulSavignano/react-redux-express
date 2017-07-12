import React from 'react'
import { connect } from 'react-redux'

import ProductItem from '../../components/products/ProductItem'

const ProductPage = ({ isFetching, item }) => (
  !isFetching &&
  <section>
    <ProductItem item={item} fullWidth={true} />
  </section>
)

const mapStateToProps = ({ products: { isFetching, items } }, { params: { productId } }) => {
  return {
    isFetching,
    item: items.find(item => item._id === productId)
  }
}

export default connect(mapStateToProps)(ProductPage)
