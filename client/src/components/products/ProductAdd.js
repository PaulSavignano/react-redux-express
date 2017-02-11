import React, { Component } from 'react'

class ProductAdd extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const productName = this.refs.productName.value
    if (productName.length) {
      this.refs.productName = ''
      this.props.onProductAdd(productName)
    } else {
      this.refs.productName.focus()
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="productName" placeholder="What do you need to do?"/>
          <button>Add Product Name</button>
        </form>
      </div>
    )
  }
}

export default ProductAdd
