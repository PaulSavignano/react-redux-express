import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import SectionItem from './SectionItem'

class SectionList extends Component {
  state = {
    hasImage: false,
    image: null
  }
  componentWillMount() {
    const image = this.props.sections.find(section => section.image)
    if (image) {
      this.setState({ hasImage: true })
      const img = new Image()
      const src = image.image
      img.src = src
      img.onload = (e) => {
        this.setState({ image: src })
      }
    }
  }
  render() {
    const { isFetching, page, sections, brand } = this.props
    return (
    !sections.length ? null : !this.state.hasImage ?
    <div>
      {sections.map(section => (
        <SectionItem
          key={section._id}
          section={section}
          brand={brand}
        />
      ))}
    </div>

    : !this.state.image ? null :

    <CSSTransitionGroup
      transitionName="image"
      transitionAppear={true}
      transitionAppearTimeout={900}
      transitionEnter={false}
      transitionLeave={false}
    >
      {sections.map(section => (
        <SectionItem
          key={section._id}
          section={section}
          brand={brand}
        />
      ))}
    </CSSTransitionGroup>
    )
  }
}


export default SectionList
