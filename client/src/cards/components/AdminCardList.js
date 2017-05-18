import React from 'react'

import AdminCardItem from '../components/AdminCardItem'

const AdminCardList = ({ section, items }) => (
  items.length < 1 ? <section><h3>No items yet</h3></section>  :
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
