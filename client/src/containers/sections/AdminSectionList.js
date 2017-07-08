import React from 'react'
import { connect } from 'react-redux'

import AdminSectionItem from './AdminSectionItem'

const AdminSectionList = ({ isFetching, sections, page, imageSpec }) => (
  !isFetching &&
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

const mapStateToProps = ({ sections: { isFetching, items } }, { page }) => ({
  isFetching,
  sections: items.filter(item => item.pageId === page._id)
})

export default connect(mapStateToProps)(AdminSectionList)
