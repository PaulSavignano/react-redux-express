import React, { Component } from 'react'
import { connect } from 'react-redux'

import NotFound from '../../components/NotFound'

const pageContainer = (ComposedComponent) => {
  class Container extends Component {
    render() {
      const { dispatch, isFetching, page, pageSlug, sections } = this.props
      const props = { dispatch, page, sections }
      return (
        isFetching ? null : pageSlug === 'notFound' ?
        <NotFound />
        :
        <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    pages,
    sections,
    slides
  }, {
    params
  }) => {
    const isFetching = pages.isFetching || sections.isFetching ? true : false
    const slug = params.slug || 'home'
    const page = !isFetching && pages.items.find(page => page.slug === slug)
    const pageSlug = page ? page.slug : 'notFound'
    return {
      isFetching,
      page,
      pageSlug,
      sections: !isFetching && page ? page.sections.map(section => sections.items.find(item => item._id === section.sectionId)) : {},
    }
  }
  return connect(mapStateToProps)(Container)
}

export default pageContainer
