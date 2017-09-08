import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const requireCart = (ComposedComponent) => {
  class RequireCart extends Component {
    componentWillMount() {
      const cart = localStorage.getItem('cart')
      if (!cart) {
        this.props.dispatch(push('/'))
      }
    }
    componentWillUpdate(nextProps) {
      if (!nextProps.cart.total) {
        this.props.dispatch(push('/'))
      }
    }
    render() {
      const { isFetching } = this.props
      return (
        isFetching ? null : <ComposedComponent {...this.props} />
      )
    }
  }
  const mapStateToProps = ({ user: { addresses }, carts: { cart } }) => ({
    addresses,
    cart,
    isFetching: cart.isFetching,
  })
  RequireCart.propTypes = {
    addresses: PropTypes.array.isRequired,
    cart: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }
  return connect(mapStateToProps)(RequireCart)
}

export default requireCart
