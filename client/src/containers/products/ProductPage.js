import React from 'react'
import { connect } from 'react-redux'

import ProductItem from '../../components/products/ProductItem'

const ProductPage = ({ isFetching, product }) => {
  return (
    isFetching ? null :
    <section>
      <ProductItem componentId={product._id} fullWidth={true} />
    </section>
  )
}

const mapStateToProps = ({ products: { isFetching, items } }, { params }) => {
  return {
    isFetching,
    product: items.find(obj => obj._id === params.productId)
  }
}

export default connect(mapStateToProps)(ProductPage)
