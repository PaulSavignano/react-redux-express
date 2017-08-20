import React from 'react'
import PropTypes from 'prop-types'

import pagesContainer from '../../containers/pages/pagesContainer'
import AdminPagesAdd from './AdminPagesAdd'
import AdminPagesItem from './AdminPagesItem'
import AdminAppCarouselButtons from '../carousels/AdminAppCarouselButtons'
import AdminAppCarousel from '../carousels/AdminAppCarousel'

const AdminPages = ({
  adminAppOpen,
  autoplay,
  dispatch,
  editSlide,
  isFetching,
  pages,
  carousel
}) => (
  <section style={{ minHeight: '80vh', padding: '32px 0'}}>
    <AdminPagesAdd />
    {pages.map(item => (
      <AdminPagesItem
        key={item._id}
        item={item}
      />
    ))}
    <AdminAppCarouselButtons
      adminAppOpen={adminAppOpen}
      autoplay={autoplay}
      carousel={carousel}
      dispatch={dispatch}
      editSlide={editSlide}
      pages={pages}
    />
    {adminAppOpen &&
      <AdminAppCarousel
        adminAppOpen={adminAppOpen}
        autoplay={autoplay}
        editSlide={editSlide}
        dispatch={dispatch}
        carousel={carousel}
      />
    }
  </section>
)

export default pagesContainer(AdminPages)
