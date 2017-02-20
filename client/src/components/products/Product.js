import React, { Component } from 'react'
import { formatPrice } from '../../modules/formatPrice'

class Product extends Component {
  handleAdd = () => {
    const productQty = this.refs.qty.value ? parseInt(this.refs.qty.value, 10) : 1
    const cart = {
      productId: this.props._id,
      productQty
    }
    this.props.onCartAdd(cart)
  }
  handleUpdate = (_id, uuid) => {
    const name = this.refs.name.value
    const description = this.refs.description.value
    const price = this.refs.price.value
    const update = { _id, uuid, name, description, price }
    this.props.onProductUpdate(update)
  }

  render() {
    const { _id, uuid, name, description, price } = this.props
    return (
      <li className="mdl-list__item">
        <span className="mdl-list__item-primary-content">
          <input type="text" defaultValue={name} ref="name" />
          <input type="text" defaultValue={description} ref="description" />
          <input type="number" defaultValue={price} ref="price" />
          <input type="number" ref="qty"/>
        </span>
        <span className="mdl-list__item-secondary-action">
          <button
            id="update"
            className="mdl-button mdl-js-button mdl-button--raised"
            onClick={() => this.handleUpdate(_id, uuid)}
          >
            Update
          </button>
          <button
            id="deleteCart"
            className="mdl-button mdl-js-button mdl-button--raised"
            onClick={() => this.props.onProductDelete(_id, uuid)}
          >
            Delete
          </button>
          <button
            id="addToCart"
            className="mdl-button mdl-js-button mdl-button--raised"
            onClick={this.handleAdd}
          >
            Add To Cart
          </button>
        </span>
      </li>
    )
  }
}

export default Product
