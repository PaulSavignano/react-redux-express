import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import muiThemeable from 'material-ui/styles/muiThemeable'

import ProductList from '../components/ProductList'

const Products = ({ isFetching, section, products }) => {
  return (
    isFetching ? null :
    <section>
      <ProductList products={products} />
    </section>
  )
}

export default Products
