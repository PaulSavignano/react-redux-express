import React from 'react'

import AdminSectionItem from '../components/AdminSectionItem'

const AdminSectionList = ({ page, items, imageSize, placeholdit }) => (
  items.length < 1 ? null :
  <div>
    {items.map(item => (
      <AdminSectionItem
        key={item._id}
        item={item}
        page={page}
        initialValues={item.values}
        imageSize={imageSize}
        placeholdit={placeholdit}
      />
    ))}
  </div>
)

export default AdminSectionList
