import React, { Component } from 'react'
import { connect } from 'react-redux'
import CartItem from './CartItem'
import { startFetchCart } from '../actions/cart'

class CartList extends Component {
  componentWillMount() {
    this.props.dispatch(startFetchCart())
  }
  render() {
    const { items } = this.props
    return (
      items ?
      <section>
        {items.map((item, index) => (
          <CartItem
            key={item.productId}
            index={index}
            {...item}
          />
        ))}
      </section>
      :
      <section><p>Nothing in your cart yet</p></section>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    items: state.cart.items
  }
}

export default connect(mapStateToProps)(CartList)
