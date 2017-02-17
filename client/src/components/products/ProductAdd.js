import React, { Component } from 'react'

class ProductAdd extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const name = this.refs.name.value
    const description = this.refs.description.value
    const price = parseInt(this.refs.price.value, 10)
    if (name.length && description.length && price) {
      const product = { name, description, price }
      this.props.onProductAdd(product)
      e.target.reset()
    } else {
      this.refs.name.focus()
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="name" placeholder="Product name"/>
          <input type="text" ref="description" placeholder="Description"/>
          <input type="text" ref="price" placeholder="Price"/>
          <button>Add Product Name</button>
        </form>
      </div>
    )
  }
}

export default ProductAdd
