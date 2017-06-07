import React from 'react'
import { connect } from 'react-redux'
import ProductItem from '../components/ProductItem'

const Product = ({ isFetching, product }) => {
  return (
    isFetching ? null :
    <section>
      <ProductItem product={product} fullWidth={true} />
    </section>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.products.isFetching,
  product: state.products.items.find(pro => pro._id === ownProps.params.productId)
})

export default connect(mapStateToProps)(Product)
