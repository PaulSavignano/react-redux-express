import React from 'react'
import { connect } from 'react-redux'
import AdminFeature from './AdminProduct'

const styles = {
  grid: {
    display: 'flex',
    flexFlow: 'row wrap',
  }
}

const AdminFeatureList = ({ products, searchProducts }) => (
  products.length > 0 ?
  <div style={styles.grid}>
    <AdminProductAdd key={1}/>
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

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(AdminFeatureList)
