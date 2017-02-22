import React, { Component } from 'react'
import Cart from './Cart'

class CartList extends Component {
  render() {
    const style = {
      width: 900
    }
    return (
      <div className="myClass" style={style}>
        {this.props.carts.map(cart => (
          <Cart
            key={cart.uuid}
            {...cart}
            onCartUpdate={this.props.onCartUpdate}
            onCartDelete={this.props.onCartDelete}
          />
        ))}
      </div>
    )
  }
}

export default CartList
