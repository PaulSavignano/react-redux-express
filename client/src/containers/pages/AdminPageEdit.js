import React from 'react'
import { connect } from 'react-redux'

import AdminSections from '../../components/sections/AdminSections'

const AdminPageEdit = ({ isFetching, page }) => (
  !isFetching &&
  <section>
    <AdminSections page={page} />
  </section>
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
