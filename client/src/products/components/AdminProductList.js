import React from 'react'

import AdminProductItem from './AdminProductItem'

const AdminProductList = ({ products, imageSize }) => (
  products.length < 1 ? null :
  <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%' }}>
    {products.map(product => (
      <AdminProductItem
        key={product._id}
        product={product}
        initialValues={product.values}
        imageSize={imageSize}
      />
    ))}
  </div>
)


export default AdminProductList
