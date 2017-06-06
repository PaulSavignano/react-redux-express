import React from 'react'
import { connect } from 'react-redux'

import AdminCarouselAdd from '../components/AdminCarouselAdd'
import AdminCarouselList from '../components/AdminCarouselList'

const imageSize = {
  width: 900,
  height: 600
}
const placeholdIt = `https://placehold.it/${imageSize.width}x${imageSize.height}`

const AdminCards = ({ isFetching, section, carousels }) => {
  return (
    isFetching ? null :
    <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%' }}>
      <AdminCarouselList section={section} carousels={carousels} imageSize={imageSize} placeholdIt={placeholdIt} />
      <AdminCarouselAdd section={section} imageSize={imageSize} placeholdIt={placeholdIt} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.carousels.isFetching,
  carousels: state.carousels.items.filter(item => item.sectionId === ownProps.section._id)
})

export default connect(mapStateToProps)(AdminCards)
