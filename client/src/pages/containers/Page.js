import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import Sections from '../../sections/containers/Sections'
import CarouselList from '../../carousels/containers/CarouselList'

class Page extends Component {
  render() {
    const { isFetching, page, sections, carousel } = this.props
    return (
      isFetching ? null :
      <CSSTransitionGroup
        transitionName="image"
        transitionAppear={true}
        transitionAppearTimeout={1000}
        transitionEnter={false}
        transitionLeave={false}
      >
        {sections ? <Sections page={page} /> : null}
        {carousel ? <CarouselList page={page} /> : null}
      </CSSTransitionGroup>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.params.slug
  const page = slug ? state.pages.items.find(item => item.slug === ownProps.params.slug) : state.pages.items.find(item => item.slug === 'home')
  return {
    isFetching: state.pages.isFetching,
    page,
    sections: state.sections.items.find(item => item.pageId === page._id) || null,
    carousel: state.carousels.items.find(item => item.pageId === page._id) || null
  }
}

export default connect(mapStateToProps)(Page)
