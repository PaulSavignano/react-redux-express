import React from 'react'

import AdminCardItem from '../components/AdminCardItem'

const AdminCardList = ({ section, items }) => (
  items.length < 1 ? null  :
  <section>
    {items.map(item => (
      <AdminCardItem
        key={item._id}
        item={item}
        section={section}
        initialValues={item.values}
      />
    ))}
  </section>
)

export default AdminCardList
