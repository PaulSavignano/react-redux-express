import React from 'react'

import AdminPageName from './AdminPageName'

const AdminPageNameList = ({ items }) => (
  !items.length ? null :
    <section>
      {items.map(item => (
        <AdminPageName key={item._id} {...item} />
      ))}
    </section>
)

export default AdminPageNameList
