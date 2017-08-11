import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const requireCart = (ComposedComponent) => {
  class RequireCart extends Component {
    componentWillMount() {
      console.log('requireCart')
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
    isFetching: cart.isFetching,
    cart,
    addresses
  })
  return connect(mapStateToProps)(RequireCart)
}

export default requireCart
