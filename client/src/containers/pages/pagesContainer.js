import React from 'react'
import { connect } from 'react-redux'

const pagesContainer = (ComposedComponent) => {
  const PagesContainer = ({
    adminAppOpen,
    editSlide,
    carousel,
    dispatch,
    isFetching,
    pages
  }) => (
    isFetching ? null :
    <ComposedComponent
      adminAppOpen={adminAppOpen}
      editSlide={editSlide}
      carousel={carousel}
      dispatch={dispatch}
      pages={pages}
    />
  )
  const mapStateToProps = ({
    pages,
    carousels
  }) => ({
    adminAppOpen: carousels.adminAppOpen,
    autoplay: carousels.autoplay,
    editSlide: carousels.editSlide,
    carousel: carousels.items.find(item => item.pageSlug === 'home'),
    isFetching: pages.isFetching || carousels.isFetching ? true : false,
    pages: pages.items,
  })
  return connect(mapStateToProps)(PagesContainer)
}

export default pagesContainer
