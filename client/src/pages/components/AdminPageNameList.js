import React from 'react'

import AdminPageName from './AdminPageName'

const AdminPageNameList = ({ items }) => (
  !items.length ? null :
    <div>
      {items.map(item => (
        <AdminPageName key={item._id} item={item} />
      ))}
    </div>
)

export default AdminPageNameList
