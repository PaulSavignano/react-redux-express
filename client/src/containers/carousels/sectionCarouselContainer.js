import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const sectionCarouselContainer = (ComposedComponent) => {
  class SectionCarouselContainer extends Component {
    render() {
      const {
        dispatch,
        adminOpen,
        autoplay,
        editCarouselId,
        editSlideId,
        carousel,
        isFetching,
        open,
      } = this.props
      const props = {
        adminOpen,
        autoplay,
        dispatch,
        editCarouselId,
        editSlideId,
        carousel,
        open
      }
      return (
        isFetching ? null : !carousel ? null : <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    carousels: {
      adminOpen,
      autoplay,
      editCarouselId,
      editSlideId,
      items,
      isFetching,
      open
    }
  }, {
    componentId
  }) => ({
    adminOpen,
    autoplay,
    editCarouselId,
    editSlideId,
    carousel: !isFetching && items.find(item => item._id === componentId),
    isFetching,
    open
  })
  SectionCarouselContainer.propTypes = {
    carousel: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
  }
  return connect(mapStateToProps)(SectionCarouselContainer)
}

export default sectionCarouselContainer
