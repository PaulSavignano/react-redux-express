import React, { Component } from 'react'

class ProductAdd extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const product = {
      name: this.refs.name.value,
      description: this.refs.description.value,
      price: parseInt(this.refs.price.value, 10)
    }
    if (product.name.length) {
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
