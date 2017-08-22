import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const appCarouselContainer = (ComposedComponent) => {
  class AppCarouselContainer extends Component {
    render() {
      const {
        dispatch,
        adminAppOpen,
        autoplay,
        editCarouselId,
        editSlide,
        carousel,
        appOpen,
      } = this.props
      const props = {
        adminAppOpen,
        autoplay,
        dispatch,
        editCarouselId,
        editSlide,
        carousel,
        appOpen
      }
      return (
        <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    carousels: {
      adminAppOpen,
      autoplay,
      editCarousel,
      editSlide,
      appOpen,
      items,
      isFetching
    },
  }, {
    carousel
  }) => ({
    adminAppOpen,
    autoplay,
    editCarousel,
    editSlide,
    carousel: items.find(item => item.pathname === '/'),
    isFetching,
    appOpen
  })
  AppCarouselContainer.propTypes = {
    adminAppOpen: PropTypes.bool.isRequired,
    appOpen: PropTypes.bool.isRequired,
    autoplay: PropTypes.bool.isRequired,
    editCarousel: PropTypes.object,
    editSlide: PropTypes.object,
    carousel: PropTypes.object,
    isFetching: PropTypes.bool.isRequired
  }
  return connect(mapStateToProps)(AppCarouselContainer)
}

export default appCarouselContainer
