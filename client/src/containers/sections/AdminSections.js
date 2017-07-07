import React from 'react'
import { connect } from 'react-redux'

import AdminSectionAdd from './AdminSectionAdd'
import AdminSectionList from './AdminSectionList'

const imageSpec = {
  type: 'image/jpg',
  width: 1920,
  height: 1080
}

const AdminSections = ({ isFetching, sections, page }) => {
  return (
    !isFetching &&
    <section style={{ maxWidth: 2000 }}>
      <AdminSectionList page={page} sections={sections} imageSpec={imageSpec} />
      <AdminSectionAdd page={page} />
    </section>
  )
}

const mapStateToProps = ({ sections: { isFetching, items } }, { page }) => ({
  isFetching,
  sections: items.filter(item => item.pageId === page._id),
})

export default connect(mapStateToProps)(AdminSections)
