import React, { Component } from 'react'
import { connect } from 'react-redux'

import pageContainer from './pageContainer'
import AdminSectionList from '../sections/AdminSectionList'
import AdminSlideAdd from '../slides/AdminSlideAdd'
import AdminCarousel from '../slides/AdminCarousel'

import { toggleCarousel } from '../../actions/slides'

class AdminPageEdit extends Component {
  componentWillMount() {
    if (this.props.slides.length) return this.props.dispatch(toggleCarousel())
  }
  render() {
    const { isFetching, page, slides, open, autoplay } = this.props
    console.log(slides)
    return (
      <div style={{ minHeight: '80vh'}}>
        <AdminSectionList page={page} />
        <AdminSlideAdd page={page} items={slides} />
        {slides.length ? <AdminCarousel items={slides} open={open} autoplay={autoplay} /> : null }
      </div>
    )
  }
}


export default pageContainer(AdminPageEdit)
