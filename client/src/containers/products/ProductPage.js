import React from 'react'
import { connect } from 'react-redux'

import ProductItemContainer from './ProductItemContainer'

const ProductPage = ({ isFetching, productId }) => (
  !isFetching &&
  <section>
    <ProductItemContainer componentId={productId} fullWidth={true} />
  </section>
)

const mapStateToProps = ({ products: { isFetching, items } }, { params: { productId } }) => ({
  isFetching,
  productId
})

export default connect(mapStateToProps)(ProductPage)
