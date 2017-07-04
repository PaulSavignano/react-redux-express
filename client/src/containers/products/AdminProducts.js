import React from 'react'
import { connect } from 'react-redux'

import AdminProductAdd from '../../components/products/AdminProductAdd'
import AdminProductList from '../../components/products/AdminProductList'

// Height is 56.25% of width
// 900 x 600 = height of 66.67%
const imageSpec = {
  type: 'image/jpg',
  width: 1012,
  height: 675
}

const AdminProducts = ({ isFetching, section, products }) => {
  return (
    !isFetching && <AdminProductList section={section} products={products} imageSpec={imageSpec} />
  )
}

const mapStateToProps = ({ products: { isFetching }}, ownProps) => ({
  isFetching
})

export default connect(mapStateToProps)(AdminProducts)
