import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const orderContainer = (ComposedComponent) => {
  class OrderContainer extends Component {
    render() {
      const {
        dispatch,
        isFetching,
        order
      } = this.props
      const props = {
        dispatch,
        order
      }
      return (
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
  OrderContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    order: PropTypes.object,
  }
  return connect(
    ({
      orders: { isFetching, items },
    }, {
      match: { params: { orderId }}
    }) => ({
      isFetching,
      order: items.find(item => item._id === orderId)
    })
  )(OrderContainer)
}

export default orderContainer
