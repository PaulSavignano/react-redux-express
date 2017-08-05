import React, { Component } from 'react'
import { connect } from 'react-redux'

const productPageContainer = (ComposedComponent) => {
  class Container extends Component {
    render() {
      const { isFetching, item } = this.props
      return (
        !isFetching && item &&
        <ComposedComponent {...this.props} />
      )
    }
  }
  const mapStateToProps = ({
    products: { items, isFetching } 
  }, {
    params: { productId }
  }) => ({
    isFetching,
    item: items.find(item => item._id === productId)
  })
  return connect(mapStateToProps)(Container)
}

export default productPageContainer
