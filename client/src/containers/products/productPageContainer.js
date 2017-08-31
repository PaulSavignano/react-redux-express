import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const productPageContainer = (ComposedComponent) => {
  class ProductPageContainer extends Component {
    render() {
      const {
        dispatch,
        isFetching,
        item,
        productStyle
      } = this.props
      const props = {
        dispatch,
        item,
        productStyle
      }
      return (
        !isFetching && item ?
        <ComposedComponent {...props} />
        :
        null
      )
    }
  }
  const mapStateToProps = ({
    brand,
    products
  }, {
    params: { productId }
  }) => ({
    isFetching: brand.isFetching || products.isFetching ? true : false,
    productStyle: brand.productStyle,
    item: products.items.find(item => item._id === productId)
  })
  ProductPageContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    item: PropTypes.object,
    productStyle: PropTypes.object
  }
  return connect(mapStateToProps)(ProductPageContainer)
}

export default productPageContainer
