import React from 'react'
import { connect } from 'react-redux'
import ProductItem from '../components/ProductItem'

const Product = ({ isFetching, product }) => {
  return (
    isFetching ? null :
    <section>
      <ProductItem componentId={product._id} fullWidth={true} />
    </section>
  )
}

const mapStateToProps = ({ products }, { params }) => {
  return {
    isFetching: products.isFetching,
    product: products.items.find(obj => obj._id === params.productId)
  }
}

export default connect(mapStateToProps)(Product)
