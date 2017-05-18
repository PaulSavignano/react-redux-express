import React from 'react'
import { connect } from 'react-redux'

import AdminSections from '../../sections/containers/AdminSections'
import AdminCarouselList from '../../carousels/containers/AdminCarouselList'

const AdminPageEdit = ({ isFetching, page }) => (
  isFetching ? null :
  <main>
    <AdminSections page={page} />
    <AdminCarouselList page={page} />
  </main>
)

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.pages.isFetching,
  page: state.pages.items.find(item => item.slug === ownProps.params.slug)
})

export default connect(mapStateToProps)(AdminPageEdit)
