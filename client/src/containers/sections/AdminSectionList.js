import React from 'react'

import AdminSectionItem from './AdminSectionItem'

const AdminSectionList = ({ sections, page, imageSpec }) => {
  return (
    sections.length < 1 ? null :
    <div>
      {sections.map(section => (
        <AdminSectionItem
          key={section._id}
          section={section}
          page={page}
          imageSpec={imageSpec}
        />
      ))}
    </div>
  )
}

export default AdminSectionList
