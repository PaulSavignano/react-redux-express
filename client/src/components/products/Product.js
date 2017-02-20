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
    const { _id, uuid, name, description, price } = this.props
    return (
      <li className="mdl-list__item">
        <span className="mdl-list__item-primary-content">
          {name}
          {description}
          {formatPrice(price)}
          <input type="number" ref="qty"/>
        </span>
        <span className="mdl-list__item-secondary-action">
          <button
            id="deleteCart"
            className="mdl-button mdl-js-button mdl-button--raised"
            onClick={() => this.props.onProductDelete(_id, uuid)}
          >
            Delete Product
          </button>
          <button
            id="addToCart"
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
