import React from 'react'
import { connect } from 'react-redux'
import ProductItem from '../components/ProductItem'

const Product = ({ isFetching, item }) => {
  return (
    isFetching ? null :
    <section>
      <ProductItem item={item} />
    </section>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.products.isFetching,
  item: state.products.items.find(pro => pro.slug === ownProps.params.slug)
})

export default connect(mapStateToProps)(Product)
