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
        editCarousel,
        editSlide,
        carousel,
        open,
      } = this.props
      const props = {
        adminOpen,
        autoplay,
        dispatch,
        editCarousel,
        editSlide,
        carousel,
        open
      }
      return (
        <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    carousels: {
      adminOpen,
      autoplay,
      editCarousel,
      editSlide,
      open
    }
  }, {
    carousel
  }) => ({
    adminOpen,
    autoplay,
    editCarousel,
    editSlide,
    carousel,
    open
  })
  SectionCarouselContainer.propTypes = {
    adminOpen: PropTypes.bool.isRequired,
    autoplay: PropTypes.bool.isRequired,
    editCarousel: PropTypes.object,
    editSlide: PropTypes.object,
    carousel: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired
  }
  return connect(mapStateToProps)(SectionCarouselContainer)
}

export default sectionCarouselContainer
