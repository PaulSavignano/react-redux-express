import React, { Component } from 'react'
import ProductAdmin from './ProductAdmin'

class ProductAdminList extends Component {
  render() {
    const style = {
      width: 900
    }
    return (
      <div className="myClass" style={style}>
        {this.props.products.map(product => (
          <ProductAdmin
            key={product.uuid}
            onCartAdd={this.props.onCartAdd}
            onProductUpdate={this.props.onProductUpdate}
            onProductDelete={this.props.onProductDelete}
            {...product}
          />
        ))}
      </div>
    )
  }
}

export default ProductAdminList
