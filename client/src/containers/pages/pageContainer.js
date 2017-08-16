import React from 'react'
import { connect } from 'react-redux'

import NotFound from '../../components/NotFound'

const pageContainer = (ComposedComponent) => {
  const PageContainer = ({
    dispatch,
    hash,
    isFetching,
    page,
    pageSlug,
    pathname,
    sections
  }) => {
    const props = { dispatch, hash, page, pathname, sections }
    return (
      isFetching ? null : pageSlug === 'notFound' ?
      <NotFound />
      :
      <ComposedComponent {...props} />
    )
  }
  const mapStateToProps = ({
    pages,
    routing: { locationBeforeTransitions: { pathname, hash }},
    sections
  }, {
    params
  }) => {
    const isFetching = pages.isFetching || sections.isFetching ? true : false
    const slug = params.slug || 'home'
    const page = pages.items.find(page => page.slug === slug)
    const pageSlug = page ? page.slug : 'notFound'
    return {
      hash,
      isFetching,
      page,
      pageSlug,
      pathname,
      sections: page.sections.map(section => sections.items.find(item => item._id === section.sectionId)),
    }
  }
  return connect(mapStateToProps)(PageContainer)
}

export default pageContainer
