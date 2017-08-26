import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import NotFound from '../../components/NotFound'

const pageContainer = (ComposedComponent) => {
  class PageContainer extends Component {
    render() {
      const {
        dispatch,
        hash,
        isFetching,
        page,
        pageSlug,
        pathname,
      } = this.props
      const props = {
        dispatch,
        hash,
        page,
        pathname
      }
      return (
        isFetching ? null : pageSlug === 'notFound' ?
        <NotFound />
        :
        <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    pages: { items, isFetching },
    routing: { locationBeforeTransitions: { pathname, hash }},
  }, {
    params
  }) => {
    const slug = params.slug || 'home'
    const page = items.find(page => page.slug === slug)
    return {
      hash,
      isFetching,
      page,
      pageSlug: page ? page.slug : 'notFound',
      pathname
    }
  }
  PageContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    hash: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    page: PropTypes.object,
    pageSlug: PropTypes.string,
    pathname: PropTypes.string.isRequired
  }
  return connect(mapStateToProps)(PageContainer)
}

export default pageContainer
