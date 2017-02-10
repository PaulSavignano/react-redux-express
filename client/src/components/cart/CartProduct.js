import React, { Component } from 'react'

class CartProduct extends Component {
  render() {
    return (
      <div>
        {this.props.productId}
      </div>
    )
  }
}

export default CartProduct
