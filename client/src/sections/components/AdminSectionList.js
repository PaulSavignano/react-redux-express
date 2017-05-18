import React from 'react'

import AdminSectionItem from '../components/AdminSectionItem'

const AdminSectionList = ({ page, items }) => (
  items.length < 1 ? <div><h3>No items yet</h3></div> :
  <div>
    {items.map(item => (
      <AdminSectionItem
        key={item._id}
        item={item}
        page={page}
        initialValues={item.values}
      />
    ))}
  </div>
)

export default AdminSectionList
