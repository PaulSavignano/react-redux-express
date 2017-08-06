import React from 'react'
import { connect } from 'react-redux'

import AdminPagesAdd from './AdminPagesAdd'
import AdminPagesList from './AdminPagesList'
import AdminCarouselEdit from '../slides/AdminCarouselEdit'
import AdminCarousel from '../slides/AdminCarousel'

const AdminPages = ({
  dispatch,
  isFetching,
  pages,
  sections,
  slides
}) => (
  !isFetching &&
  <section style={{ minHeight: '80vh', padding: '32px 0'}}>
    <AdminPagesAdd />
    <AdminPagesList items={pages.items} />
    <AdminCarouselEdit items={slides.items} adminOpen={slides.adminOpen} />
    {slides.adminOpen ?
      <AdminCarousel
        items={slides.items}
        adminOpen={slides.adminOpen}
        autoplay={slides.autoplay}
      />
    : null
    }
  </section>
)

const mapStateToProps = ({ pages, sections, slides }) => ({
  isFetching: pages.isFetching || sections.isFetching || slides.isFetching ? true : false,
  pages,
  sections,
  slides,
})


export default connect(mapStateToProps)(AdminPages)
