import React from 'react'
import { connect } from 'react-redux'

import AdminProductAdd from '../components/AdminProductAdd'
import AdminProductList from '../components/AdminProductList'

// Height is 56.25% of width
// 900 x 600 = height of 66.67%
const imageSize = {
  width: 1012,
  height: 675
}

const AdminProducts = ({ isFetching, section, products }) => {
  return (
    isFetching ? null :
      <AdminProductList section={section} products={products} imageSize={imageSize} />
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.products.isFetching
})

export default connect(mapStateToProps)(AdminProducts)
