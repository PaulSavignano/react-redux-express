import React, { Component } from 'react'
import { connect } from 'react-redux'

import NotFound from '../../components/NotFound'

const pageContainer = (ComposedComponent) => {
  class Container extends Component {
    render() {
      const { dispatch, isFetching, page, pageSlug, sections, slides, open, autoplay } = this.props
      const props = { dispatch, page, sections, slides, open, autoplay }
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
    const slug = params.slug || 'home'
    const page = pages.items.find(page => page.slug === slug)
    const pageSlug = page ? page.slug : 'notFound'
    const isFetching = pages.isFetching || sections.isFetching || slides.isFetching ? true : false
    return {
      isFetching,
      page,
      pageSlug,
      sections: !isFetching && page ? page.sections.map(section => sections.items.find(item => item._id === section.sectionId)) : {},
      slides: !isFetching && page ? page.slides.map(slide => slides.items.find(item => item._id === slide.slideId)) : {},
      open: slides.open,
      autoplay: slides.autoplay
    }
  }
  return connect(mapStateToProps)(Container)
}

export default pageContainer
