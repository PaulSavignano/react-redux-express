import React from 'react'
import { connect } from 'react-redux'

import AdminPagesAdd from './AdminPagesAdd'
import AdminPagesList from './AdminPagesList'
import AdminPageCarouselButtons from '../../components/carousels/AdminPageCarouselButtons'
import AdminPageCarousel from '../../components/carousels/AdminPageCarousel'

const AdminPages = ({
  adminOpen,
  dispatch,
  editSlideId,
  isFetching,
  pages,
  sections,
  carousel
}) => (
  !isFetching &&
  <section style={{ minHeight: '80vh', padding: '32px 0'}}>
    <AdminPagesAdd />
    <AdminPagesList items={pages.items} />
    <AdminPageCarouselButtons
      adminOpen={adminOpen}
      carousel={carousel}
      dispatch={dispatch}
      editSlideId={editSlideId}
    />
    {adminOpen &&
      <AdminPageCarousel />
    }
  </section>
)

const mapStateToProps = ({ pages, sections, carousels }) => ({
  isFetching: pages.isFetching || sections.isFetching || carousels.isFetching ? true : false,
  pages,
  sections,
  adminOpen: carousels.adminOpen,
  editSlideId: carousels.editSlideId,
  carousel: carousels.items.find(item => item.pageSlug === 'home'),
})


export default connect(mapStateToProps)(AdminPages)
