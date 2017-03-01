import React, { Component } from 'react'
import Product from './Product'

class ProductList extends Component {
  render() {
    const style = {
      width: 900
    }
    return (
      <div className="myClass" style={style}>
        {this.props.products.map(product => (
          <Product
            key={product._id}
            onCartAdd={this.props.onCartAdd}
            {...product}
          />
        ))}
      </div>
    )
  }
}

export default ProductList
