import React, { Component } from 'react'
import ProductList from './ProductList'
import ProductSearch from './ProductSearch'

class ProductsPage extends Component {
  render() {
    const styles = {
      grid: {
        maxWidth: 900,
        margin: 'auto'
      }
    }
    return (
      <main className="mdl-layout__content">
        <div className="mdl-grid" style={styles.grid}>
          <h1>Products</h1>
          <ProductSearch onSearch={this.props.onSearch}/>
          <br />
          <ProductList
            products={this.props.products}
            onCartAdd={this.props.onCartAdd}
          />
        </div>
      </main>
    )
  }
}

export default ProductsPage
