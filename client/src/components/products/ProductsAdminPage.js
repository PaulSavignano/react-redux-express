import React, { Component } from 'react'
import ProductAdminList from './ProductAdminList'
import ProductAdminAdd from './ProductAdminAdd'
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
          <h1>Products Admin</h1>
          <ProductSearch onSearch={this.props.onSearch}/>
          <ProductAdminAdd onProductAdd={this.props.onProductAdd} />
          <br />
          <ProductAdminList
            products={this.props.products}
            onProductUpdate={this.props.onProductUpdate}
            onProductDelete={this.props.onProductDelete}
          />
        </div>
      </main>
    )
  }
}

export default ProductsPage
