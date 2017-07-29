import React from 'react'
import { connect } from 'react-redux'

import ProductItem from './ProductItem'

const ProductPage = ({ isFetching, productId }) => (
  !isFetching &&
  <section>
    <ProductItem componentId={productId} fullWidth={true} />
  </section>
)

const mapStateToProps = ({ products: { isFetching, items } }, { params: { productId } }) => ({
  isFetching,
  productId
})

export default connect(mapStateToProps)(ProductPage)
