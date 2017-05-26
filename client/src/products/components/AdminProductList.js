import React from 'react'

import AdminProductAdd from './AdminProductAdd'
import AdminProductItem from './AdminProductItem'

const AdminProductList = ({ items, imageSize, placeholdIt }) => (
  items.length < 1 ? <h3>No items yet</h3> :
  <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
    {items.map(item => (
      <AdminProductItem
        key={item._id}
        item={item}
        initialValues={item.values}
        imageSize={imageSize}
        placeholdIt={placeholdIt}
      />
    ))}
  </div>
)


export default AdminProductList
