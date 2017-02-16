import React, { Component } from 'react'
import { formatPrice } from '../../modules/formatPrice'

class Product extends Component {
  handleClick = () => {
    const productQty = this.refs.qty.value ? parseInt(this.refs.qty.value, 10) : 1
    const cart = {
      productId: this.props._id,
      productQty
    }
    this.props.onCartAdd(cart)
  }
  render() {
    return (
      <li className="mdl-list__item">
        <span className="mdl-list__item-primary-content">
          {this.props.name}
          {this.props.description}
          {formatPrice(this.props.price)}
          <input type="number" ref="qty"/>
        </span>
        <span className="mdl-list__item-secondary-action">
          <button
            className="mdl-button mdl-js-button mdl-button--raised"
            onClick={this.handleClick}
          >
            Add To Cart
          </button>
        </span>
      </li>
    )
  }
}

export default Product
