import React from 'react'

import AdminSectionItem from '../components/AdminSectionItem'

const AdminSectionList = ({ page, sections, imageSize }) => {
  return (
    sections.length < 1 ? null :
    <div>
      {sections.map(section => (
        <AdminSectionItem
          key={section._id}
          section={section}
          page={page}
          initialValues={section.values}
          imageSize={imageSize}
        />
      ))}
    </div>
  )
}

export default AdminSectionList
