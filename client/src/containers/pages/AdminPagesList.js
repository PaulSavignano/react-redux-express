import React from 'react'

import AdminPagesItem from './AdminPagesItem'

const AdminPagesList = ({ items }) => (
  <div>
    {items.map(item => (
      <AdminPagesItem key={item._id} item={item} />
    ))}
  </div>
)

export default AdminPagesList
