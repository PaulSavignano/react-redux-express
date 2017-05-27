import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import muiThemeable from 'material-ui/styles/muiThemeable'

import AdminProductList from '../components/AdminProductList'
import AdminProductAdd from '../components/AdminProductAdd'

const imageSize = {
  width: 900,
  height: 600
}
const placeholdIt = `https://placehold.it/${imageSize.width}x${imageSize.height}`

const AdminProducts = ({ isFetching, items, muiTheme }) => (
  isFetching ? null :
  <section>
    <h1 style={{ fontFamily: muiTheme.fontFamily }}>Products Admin</h1>
    <AdminProductAdd imageSize={imageSize} placeholdIt={placeholdIt} />
    <AdminProductList items={items} imageSize={imageSize} placeholdIt={placeholdIt} />
  </section>
)

const mapStateToProps = ({ products }) => ({
  isFetching: products.isFetching,
  items: products.items
})


export default compose(connect(mapStateToProps), muiThemeable())(AdminProducts)
