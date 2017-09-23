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
      } = this.props
      const props = {
        dispatch,
        page,
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
    pages: { items, isFetching }
  }, {
    match: { params: { slug }},
  }) => {
    const pageSlug = slug || 'home'
    const page = items.find(page => page.slug === pageSlug)
    return {
      isFetching,
      page,
      pageSlug: page ? page.slug : 'notFound',
    }
  }
  PageContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    page: PropTypes.object,
    pageSlug: PropTypes.string,
  }
  return connect(mapStateToProps)(PageContainer)
}

export default pageContainer
