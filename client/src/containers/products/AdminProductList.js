import React from 'react'

import AdminProductItem from './AdminProductItem'

const AdminProductList = ({ products, imageSpec }) => (
  products.length < 1 ? null :
  <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%' }}>
    {products.map(product => (
      <AdminProductItem
        key={product._id}
        product={product}
        initialValues={product.values}
        imageSpec={imageSpec}
      />
    ))}
  </div>
)


export default AdminProductList
