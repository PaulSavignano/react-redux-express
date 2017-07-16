import React from 'react'
import { connect } from 'react-redux'

import AdminSectionList from '../sections/AdminSectionList'

const AdminPageEdit = ({ isFetching, page }) => (
  !isFetching && <AdminSectionList page={page} />
)

const mapStateToProps = ({ pages }, { params }) => {
  const slug = params.slug || 'home'
  const page = pages.items.find(page => page.slug === slug)
  return {
    isFetching: pages.isFetching,
    page
  }
}

export default connect(mapStateToProps)(AdminPageEdit)
