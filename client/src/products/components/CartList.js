import React, { Component } from 'react'
import { connect } from 'react-redux'
import Cart from './Cart'
import { startFetchCartProducts } from '../actions/index'


const filterProducts = (products, searchText) => {
  const filteredProducts = products.filter(product => {
    const name = product.name.toLowerCase()
    return searchText.length === 0 || name.indexOf(searchText.toLowerCase()) > -1
  })
  return filteredProducts
}

export class CartList extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(startFetchCartProducts())
  }
  render() {
    const { products, searchCartProducts } = this.props
    return (
      products.length > 0 ?
      <div className="mdl-grid">
        {filterProducts(products, searchCartProducts).map(product => (
          <Cart
            key={product._id}
            {...product}
          />
        ))}
      </div> :
      <div><p className="container__message">Nothing in your cart yet</p></div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(CartList)
