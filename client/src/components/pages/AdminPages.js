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
  pages,
  carousel
}) => (
  <section style={{ minHeight: '80vh', padding: '32px 0'}}>
    <AdminPagesAdd />
    {pages.map(item => (
      <AdminPagesItem
        key={item._id}
        item={item}
        initialValues={item.values}
        form={`page_${item._id}`}
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

AdminPages.propTypes = {
  adminAppOpen: PropTypes.bool.isRequired,
  autoplay: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  editSlide: PropTypes.object,
  pages: PropTypes.array.isRequired,
  carousel: PropTypes.object,
}

export default pagesContainer(AdminPages)
