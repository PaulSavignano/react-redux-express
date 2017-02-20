import React, { Component } from 'react'
import Product from './Product'

class ProductList extends Component {
  render() {
    return (
      <ul className="demo-list-control mdl-list">
        {this.props.products.map(product => (
          <Product
            key={product.uuid}
            onCartAdd={this.props.onCartAdd}
            onProductDelete={this.props.onProductDelete}
            {...product}
          />
        ))}
      </ul>
    )
  }
}

export default ProductList
