import React from 'react'
import { connect } from 'react-redux'

import AdminSectionItem from './AdminSectionItem'
import AdminSectionAdd from './AdminSectionAdd'

const AdminSectionList = ({ isFetching, sections, page, imageSpec }) => (
  !isFetching &&
  <div>
    {sections.map(section => (
      <AdminSectionItem
        key={section._id}
        item={section}
        page={page}
        imageSpec={imageSpec}
      />
    ))}
    <AdminSectionAdd page={page} />
  </div>
)

const mapStateToProps = ({ sections: { isFetching, items } }, { page }) => ({
  isFetching,
  sections: items.filter(item => item.pageId === page._id)
})

export default connect(mapStateToProps)(AdminSectionList)
