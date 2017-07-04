import React from 'react'
import { connect } from 'react-redux'

import AdminSlideAdd from '../components/AdminSlideAdd'
import AdminSlideList from '../components/AdminSlideList'

const AdminSlides = ({ isFetching, section, slides }) => {
  return (
    !isFetching &&
      <AdminCarouselList section={section} slides={slides} />
  )
}

const mapStateToProps = ({ slides: { isFetching }}) => ({
  isFetching
})

export default connect(mapStateToProps)(AdminSlides)
