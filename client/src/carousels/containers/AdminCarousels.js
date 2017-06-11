import React from 'react'
import { connect } from 'react-redux'

import AdminCarouselAdd from '../components/AdminCarouselAdd'
import AdminCarouselList from '../components/AdminCarouselList'

const imageSize = {
  width: 300,
  height: 200
}

const AdminCarousels = ({ isFetching, section, carousels }) => {
  return (
    isFetching ? null :
      <AdminCarouselList section={section} carousels={carousels} imageSize={imageSize} />
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.carousels.isFetching
})

export default connect(mapStateToProps)(AdminCarousels)
