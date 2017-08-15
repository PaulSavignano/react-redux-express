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
        isFetching,
        appOpen,
      } = this.props
      console.log('container carousel', carousel)
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
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    carousels: {
      adminAppOpen,
      autoplay,
      editCarouselId,
      editSlide,
      items,
      isFetching,
      appOpen
    },
  }) => ({
    adminAppOpen,
    autoplay,
    editCarouselId,
    editSlide,
    carousel: items.find(item => item.pathname === '/'),
    isFetching,
    appOpen
  })
  AppCarouselContainer.propTypes = {
    carousel: PropTypes.object,
    isFetching: PropTypes.bool.isRequired
  }
  return connect(mapStateToProps)(AppCarouselContainer)
}

export default appCarouselContainer
