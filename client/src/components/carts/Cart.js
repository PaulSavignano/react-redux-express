import React, { Component } from 'react'
import { formatPrice } from '../../modules/formatPrice'

class Cart extends Component {
  render() {
    return (
      <li className="mdl-list__item">
        <span className="mdl-list__item-primary-content">
          {this.props.name}
          {formatPrice(this.props.price)}
          <input type="number" ref="qty" defaultValue={this.props.productQty}/>
        </span>
        <span className="mdl-list__item-secondary-action">
          <button
            className="mdl-button mdl-js-button mdl-button--raised"
            onClick={this.handleUpdate}
          >
            Update
          </button>
          <button
            className="mdl-button mdl-js-button mdl-button--raised"
            onClick={this.handleRemove}
          >
            Remove
          </button>
        </span>
      </li>
    )
  }
}

export default Cart
