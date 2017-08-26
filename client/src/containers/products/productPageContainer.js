import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const productPageContainer = (ComposedComponent) => {
  class ProductPageContainer extends Component {
    render() {
      const {
        dispatch,
        isFetching,
        item
      } = this.props
      const props = {
        dispatch,
        item
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
    products: { items, isFetching }
  }, {
    params: { productId }
  }) => ({
    isFetching,
    item: items.find(item => item._id === productId)
  })
  ProductPageContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(ProductPageContainer)
}

export default productPageContainer
