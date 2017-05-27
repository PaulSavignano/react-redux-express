import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import muiThemeable from 'material-ui/styles/muiThemeable'

import ProductList from '../components/ProductList'

const Products = ({ isFetching, items, muiTheme }) => {
  return (
    isFetching ? null :
    <section>
      <h1 style={{ fontFamily: muiTheme.fontFamily, color: muiTheme.palette.textColor }}>Products</h1>
      <ProductList items={items} />
    </section>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.products.isFetching,
  items: state.products.items
})

export default compose(connect(mapStateToProps), muiThemeable())(Products)
