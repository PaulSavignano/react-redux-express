import React, { Component } from 'react'

class CartAdd extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const cartProductId = this.refs.cartProductId.value
    if (cartProductId.length) {
      this.refs.cartProductId = ''
      this.props.onCartAdd(cartProductId)
    } else {
      this.refs.cartProductId.focus()
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="cartProductId" placeholder="What do you need to do?"/>
          <button>Add To Cart</button>
        </form>
      </div>
    )
  }
}

export default CartAdd
