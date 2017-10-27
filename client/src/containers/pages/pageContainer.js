import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import NotFoundPage from '../../components/not-found/NotFoundPage'

const pageContainer = (ComposedComponent) => {
  class PageContainer extends Component {
    render() {
      const {
        backgroundImage,
        dispatch,
        isFetching,
        page,
        pageSlug,
        textColor
      } = this.props
      const propsForParent = {
        style: {
          backgroundImage: backgroundImage.src && `url(${backgroundImage.src})`,
          backgroundPosition: page.values.backgroundPosition,
          backgroundColor: page.values.backgroundColor,
        },
        className: backgroundImage.src && 'background-image'
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
    pages: { backgroundImage, items, isFetching },
    brand: { palette: { values: { textColor }}}
  }, {
    match: { params: { slug }},
  }) => {
    const pageSlug = slug || 'home'
    const page = items.find(page => page.slug === pageSlug)
    return {
      backgroundImage,
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
