import React from 'react'
import { connect } from 'react-redux'
import Product from './Product'
import { startFetchProducts } from '../actions/product'


const filterProducts = (products, searchText) => {
  const filteredProducts = products.filter(product => {
    const name = product.name.toLowerCase()
    return searchText.length === 0 || name.indexOf(searchText.toLowerCase()) > -1
  })
  return filteredProducts
}

const styles = {
  grid: {
    display: 'flex',
    flexFlow: 'row wrap',
  }
}

const ProductList = ({ products, searchProducts }) => (
  products.length > 0 ?
  <div style={styles.grid}>
    {products.map(product => (
      <Product
        key={product._id}
        {...product}
      />
    ))}
  </div> :
  <div><p className="container__message">No products yet</p></div>
)

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(ProductList)
