import React from 'react'
import { connect } from 'react-redux'

import AdminProductAdd from '../components/AdminProductAdd'
import AdminProductList from '../components/AdminProductList'

const imageSize = {
  width: 900,
  height: 600
}
const placeholdIt = `https://placehold.it/${imageSize.width}x${imageSize.height}`

const AdminProducts = ({ isFetching, section, products }) => {
  return (
    isFetching ? null :
    <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%' }}>
      <AdminProductList section={section} products={products} imageSize={imageSize} placeholdIt={placeholdIt} />
      <AdminProductAdd section={section} imageSize={imageSize} placeholdIt={placeholdIt} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.products.isFetching,
  products: state.products.items.filter(product => product.sectionId === ownProps.section._id)
})

export default connect(mapStateToProps)(AdminProducts)
