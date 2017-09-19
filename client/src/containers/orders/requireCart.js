import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import history from '../routers/history'

const requireCart = (ComposedComponent) => {
  class RequireCart extends Component {
    componentWillMount() {
      const cart = localStorage.getItem('cart')
      if (!cart) {
        history.push('/')
      }
    }
    componentWillUpdate(nextProps) {
      if (!nextProps.cart.total) {
        history.push('/')
      }
    }
    render() {
      const { isFetching } = this.props
      return (
        isFetching ? null : <ComposedComponent {...this.props} />
      )
    }
  }
  const mapStateToProps = ({ user, carts }) => ({
    addresses: user.addresses,
    cart: carts.cart,
    isFetching: carts.isFetching || user.isFetching ? true : false,
  })
  RequireCart.propTypes = {
    addresses: PropTypes.array.isRequired,
    cart: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }
  return connect(mapStateToProps)(RequireCart)
}

export default requireCart
