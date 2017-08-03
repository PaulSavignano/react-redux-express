import React from 'react'
import { connect } from 'react-redux'

import AdminSectionItem from '../../components/sections/AdminSectionItem'

const AdminSectionList = ({ items, page }) => (
  <div>
    {items.map(item => (
      <AdminSectionItem
        key={item._id}
        item={item}
        page={page}
      />
    ))}

  </div>
)


export default AdminSectionList
