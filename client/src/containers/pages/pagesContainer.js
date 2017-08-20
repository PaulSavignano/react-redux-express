import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const pagesContainer = (ComposedComponent) => {
  class PagesContainer extends Component {
    render() {
      const {
        adminAppOpen,
        editSlide,
        carousel,
        dispatch,
        isFetching,
        pages
      } = this.props
      const props = {
        adminAppOpen,
        editSlide,
        carousel,
        dispatch,
        pages
      }
      return (
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
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
  PagesContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    adminAppOpen: PropTypes.bool.isRequired,
    autoplay: PropTypes.bool.isRequired,
    editSlide: PropTypes.object,
    carousel: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    pages: PropTypes.array.isRequired
  }
  return connect(mapStateToProps)(PagesContainer)
}

export default pagesContainer
