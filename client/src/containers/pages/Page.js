import React, { Component } from 'react'
import { connect } from 'react-redux'

import pageContainer from './pageContainer'
import SectionList from '../../containers/sections/SectionList'
import Carousel from '../slides/Carousel'

import { toggleCarousel } from '../../actions/slides'

class Page extends Component {
  componentWillMount() {
    window.scrollTo(0,0)
    if (this.props.slides.length) return this.props.dispatch(toggleCarousel())
  }
  render() {
    const { isFetching, page, sections, slides, open, autoplay } = this.props
    return (
      <div>
        <SectionList items={sections} />
        {slides.length ? <Carousel items={slides} open={open} /> : null }
      </div>
    )
  }
}


export default pageContainer(Page)
