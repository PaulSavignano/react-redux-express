import React from 'react'
import { connect } from 'react-redux'
import Product from '../components/Product'

const ProductPage = ({ isFetching, item }) => {
  return (
    isFetching ? null :
    <main>
      <section><Product item={item} /></section>
    </main>
  )
}

const mapStateToProps = (state, ownProps) => {
  if (!state.products.isFetching) {
    return {
      isFetching: state.products.isFetching,
      item: state.products.items.find(pro => pro.slug === ownProps.params.slug)
    }
  }
  return {
    isFetching: state.products.isFetching
  }
}

export default connect(mapStateToProps)(ProductPage)
