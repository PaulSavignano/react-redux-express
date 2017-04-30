import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import AdminProduct from './AdminProduct'

const filterProducts = (products, searchText) => {
  const filteredProducts = products.filter(product => {
    const name = product.values.name.toLowerCase()
    console.log(name)
    return searchText.length === 0 || name.indexOf(searchText.toLowerCase()) > -1
  })
  return filteredProducts
}

const AdminProductList = ({ dispatch, isFetching, products, searchProducts }) => (
  isFetching ? null : products.length > 0 ?
  <section>
    {filterProducts(products, searchProducts).map(product => (
      <AdminProduct
        key={product._id}
        {...product}
        initialValues={product.values}
      />
    ))}
  </section> :
  <section><h3 onTouchTap={() => dispatch(push('/admin/products'))}>No products yet, let's make some!</h3></section>
)

const mapStateToProps = (state) => {
  if (!state.products.isFetching) {
    return {
      isFetching: state.products.isFetching,
      products: state.products.items || [],
      searchProducts: state.searchProducts
    }
  }
  return {
    isFetching: state.products.isFetching,
    products: []
  }
}

export default connect(mapStateToProps)(AdminProductList)
