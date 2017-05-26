import React from 'react'

import AdminCardItem from '../components/AdminCardItem'

const AdminCardList = ({ section, items, imageSize, placeholdIt }) => (
  items.length < 1 ? null  :
  <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
    {items.map(item => (
      <AdminCardItem
        key={item._id}
        item={item}
        section={section}
        initialValues={item.values}
        imageSize={imageSize}
        placeholdIt={placeholdIt}
      />
    ))}
  </div>
)

export default AdminCardList
