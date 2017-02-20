import React, { Component } from 'react'
import { formatPrice } from '../../modules/formatPrice'

class Cart extends Component {
  render() {
    const { _id, uuid, name, price, productQty } = this.props
    return (
      <li className="mdl-list__item">
        <span className="mdl-list__item-primary-content">
          {name}
          {formatPrice(price)}
          <input type="number" ref="qty" defaultValue={productQty}/>
        </span>
        <span className="mdl-list__item-secondary-action">
          <button
            id="update"
            className="mdl-button mdl-js-button mdl-button--raised"
            onClick={() => this.props.onCartUpdate(uuid, parseInt(this.refs.qty.value, 10))}
          >
            Update
          </button>
          <button
            id="delete"
            className="mdl-button mdl-js-button mdl-button--raised"
            onClick={() => this.props.onCartDelete(_id, uuid)}
          >
            Delete
          </button>
        </span>
      </li>
    )
  }
}

export default Cart
