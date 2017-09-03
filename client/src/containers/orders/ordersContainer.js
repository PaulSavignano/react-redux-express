import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const ordersContainer = (ComposedComponent) => {
  class OrdersContainer extends Component {
    render() {
      const {
        dispatch,
        isFetching,
        orders,
        user
      } = this.props
      const props = {
        dispatch,
        orders,
        user
      }
      return (
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    orders,
    user
  }) => ({
    orders: orders.items,
    isFetching: orders.isFetching || user.isFetching ? true : false,
    user
  })
  OrdersContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    orders: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(OrdersContainer)
}

export default ordersContainer
