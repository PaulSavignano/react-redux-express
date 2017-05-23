import React from 'react'
import { connect } from 'react-redux'

import AdminSections from '../../sections/containers/AdminSections'

const AdminPageEdit = ({ isFetching, page }) => (
  isFetching ? null :
  <main>
    <AdminSections page={page} />
  </main>
)

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.pages.isFetching,
  page: state.pages.items.find(item => item.slug === ownProps.params.slug)
})

export default connect(mapStateToProps)(AdminPageEdit)
