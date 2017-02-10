import React, { Component } from 'react'
import Product from './Product'

class ProductList extends Component {
  render() {
    return (
      <div>
        <h1>Products List</h1>
        {this.props.products.map(product => (
          <Product key={product._id} {...product} />
        ))}
      </div>
    )
  }
}

export default ProductList
