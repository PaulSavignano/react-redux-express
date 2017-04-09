import React, { Component } from 'react'
import { connect } from 'react-redux'
import CartItem from './CartItem'
import { startFetchCart } from '../actions/cart'

class CartList extends Component {
  componentWillMount() {
    this.props.dispatch(startFetchCart())
  }
  render() {
    const { cart } = this.props
    return (
      cart.items ?
      <div>
        {cart.items.map((item, index) => (
          <CartItem
            key={item.productId}
            index={index}
            {...item}
          />
        ))}
      </div> :
      <div><p className="container__message">Nothing in your cart yet</p></div>
    )
  }
}


const mapStateToProps = (state) => {
  console.log(state)
  return {
      cart: state.cart
  }
}

export default connect(mapStateToProps)(CartList)
