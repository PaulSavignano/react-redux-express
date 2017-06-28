import React from 'react'
import { connect } from 'react-redux'

import AdminSections from '../../sections/containers/AdminSections'

const AdminPageEdit = ({ isFetching, page }) => (
  isFetching ? null :
  <section>
    <AdminSections page={page} />
  </section>
)

const mapStateToProps = ({ pages }, { params }) => {
  const slug = params.slug || 'home'
  return {
    isFetching: pages.isFetching,
    page: pages.items.find(obj => obj.slug === slug)
  }
}

export default connect(mapStateToProps)(AdminPageEdit)
