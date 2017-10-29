import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import NotFoundPage from '../../components/not-found/NotFoundPage'

const pageContainer = (ComposedComponent) => {
  class PageContainer extends Component {
    render() {
      const {
        dispatch,
        isFetching,
        page,
        pageSlug,
        textColor
      } = this.props
      const { 
        backgroundImage,
        values: { backgroundColor, backgroundPosition }
      } = page
      const propsForParent = {
        style: {
          backgroundImage: backgroundImage && backgroundImage.src ? `url(${backgroundImage.src})` : null,
          backgroundPosition,
          backgroundColor,
        },
        className: backgroundImage && backgroundImage.src && 'background-image'
      }
      const props = {
        dispatch,
        page,
        propsForParent,
        textColor
      }
      return (
        isFetching ? null : pageSlug === 'notFound' ?
        <NotFoundPage />
        :
        <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    pages: { items, isFetching },
    brand: { palette: { values: { textColor }}}
  }, {
    match: { params: { slug }},
  }) => {
    const pageSlug = slug || 'home'
    const page = items.find(page => page.slug === pageSlug)
    return {
      isFetching,
      page,
      pageSlug: page ? page.slug : 'notFound',
      textColor
    }
  }
  PageContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    page: PropTypes.object,
    pageSlug: PropTypes.string,
    textColor: PropTypes.string
  }
  return connect(mapStateToProps)(PageContainer)
}

export default pageContainer
