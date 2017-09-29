import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import history from '../routers/history'

const orderAddContainer = (ComposedComponent) => {
  class OrderAddContainer extends Component {
    componentWillMount() {
      const cart = localStorage.getItem('cart')
      if (!cart) {
        history.push('/user/signin')
      }
    }
    componentWillUpdate(nextProps) {
      if (!nextProps.cart.total) {
        history.push('/user/signin')
      }
    }
    render() {
      const { isFetching } = this.props
      return (
        isFetching ? null : <ComposedComponent {...this.props} />
      )
    }
  }
  const mapStateToProps = ({
    brand: { isFetching: brandIsFetching, business: { values: { stripePk }}},
    carts: { isFetching: cartIsFetching, cart },
    user : { isFetching: userIsFetching, addresses }
  }) => ({
    addresses,
    cart,
    stripePk,
    isFetching: brandIsFetching || cartIsFetching || userIsFetching ? true : false,
  })
  OrderAddContainer.propTypes = {
    addresses: PropTypes.array.isRequired,
    cart: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }
  return connect(mapStateToProps)(OrderAddContainer)
}

export default orderAddContainer
