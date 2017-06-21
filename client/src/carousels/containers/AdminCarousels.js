import React from 'react'
import { connect } from 'react-redux'

import AdminCarouselAdd from '../components/AdminCarouselAdd'
import AdminCarouselList from '../components/AdminCarouselList'

const imageSpec = {
  type: 'image/jpg',
  width: 300,
  height: 200
}

const AdminCarousels = ({ isFetching, section, carousels }) => {
  return (
    !isFetching &&
      <AdminCarouselList section={section} carousels={carousels} imageSpec={imageSpec} />
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.carousels.isFetching
})

export default connect(mapStateToProps)(AdminCarousels)
