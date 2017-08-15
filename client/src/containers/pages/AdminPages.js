import React from 'react'
import { connect } from 'react-redux'

import AdminPagesAdd from './AdminPagesAdd'
import AdminPagesList from './AdminPagesList'
import AdminAppCarouselButtons from '../../components/carousels/AdminAppCarouselButtons'
import AdminAppCarousel from '../../components/carousels/AdminAppCarousel'

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
    <AdminAppCarouselButtons
      adminOpen={adminOpen}
      carousel={carousel}
      dispatch={dispatch}
      editSlideId={editSlideId}
      pages={pages}
    />
    {adminOpen &&
      <AdminAppCarousel />
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
