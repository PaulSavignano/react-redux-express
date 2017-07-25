import React from 'react'
import { connect } from 'react-redux'

import AdminSectionItem from '../../components/sections/AdminSectionItem'
import AdminSectionAdd from './AdminSectionAdd'

const AdminSectionList = ({ dispatch, isFetching, sections, page }) => (
  !isFetching &&
  <div>
    {sections.map(section => (
      <AdminSectionItem
        key={section._id}
        item={section}
        page={page}
        dispatch={dispatch}
      />
    ))}
    <AdminSectionAdd page={page} />
  </div>
)

const mapStateToProps = ({ sections: { isFetching, items } }, { page }) => {
  return {
    isFetching,
    sections: items.filter(item => item.pageId === page._id)
  }

}

export default connect(mapStateToProps)(AdminSectionList)
