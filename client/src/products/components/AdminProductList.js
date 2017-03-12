import React, { Component } from 'react'
import { connect } from 'react-redux'
import AdminProduct from './AdminProduct'
import { startFetchProducts } from '../actions/index'


const filterProducts = (products, searchText) => {
  const filteredProducts = products.filter(product => {
    const name = product.name.toLowerCase()
    return searchText.length === 0 || name.indexOf(searchText.toLowerCase()) > -1
  })
  return filteredProducts
}

export class AdminProductList extends Component {
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
          <AdminProduct
            key={product._id}
            {...product}
            initialValues={product}
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

export default connect(mapStateToProps)(AdminProductList)
