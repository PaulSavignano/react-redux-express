import React, { Component } from 'react'
import { connect } from 'react-redux'
import CartItem from './CartItem'


const CartList = ({ items }) => (
  items.length > 0 ?
  <div className="mdl-grid">
    {items.map(item => (
      <CartItem
        key={item.productId}
        {...item}
      />
    ))}
  </div> :
  <div><p className="container__message">Nothing in your cart yet</p></div>
)

const mapStateToProps = (state) => ({
  items: state.cart.items
})

export default connect(mapStateToProps)(CartList)
