import React, { Component } from 'react'
import { connect } from 'react-redux'
import Product from './Product'
import { filterProducts } from '../api/todoAPI'
import { startFetchProducts } from '../actions/index'


const filterProducts = (products, searchText) => {
  var filteredProducts = products
  filteredProducts = filteredProducts.filter(product => {
    const name = product.name.toLowerCase()
    return searchText.length === 0 || name.indexOf(searchText.toLowerCase()) > -1
  })
  return filteredProducts
}

export class ProductList extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(startFetchProducts())
  }
  render() {
    const { products, searchProducts } = this.props
    return (
      products.length > 0 ?
      <div className="mdl-grid">
        {filterProducts(products, searchProducts).map(product => (
          <Product
            key={product._id}
            {...product}
          />
        ))}
      </div> :
      <div><p className="container__message">No products yet</p></div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(ProductList)
