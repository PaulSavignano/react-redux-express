import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import NotFound from '../../components/NotFound'

const pageContainer = (ComposedComponent) => {
  class Container extends Component {
    render() {
      const { isFetching, pageSlug } = this.props
      return (
        isFetching ? null : pageSlug === 'notFound' ?
        <NotFound />
        :
        <ComposedComponent {...this.props} />
      )
    }
  }
  const mapStateToProps = ({ pages, sections, slides }, { params }) => {
    const slug = params.slug || 'home'
    const page = pages.items.find(page => page.slug === slug)
    const pageSlug = page ? page.slug : 'notFound'
    return {
      isFetching: pages.isFetching || slides.isFetching ? true : false,
      page,
      pageSlug,
      sections: sections.items.filter(item => item.pageId === page._id),
      slides: slides.items.filter(slide => slide.pageId === page._id),
      open: slides.open,
      autoplay: slides.autoplay
    }
  }
  return connect(mapStateToProps)(Container)
}

export default pageContainer
