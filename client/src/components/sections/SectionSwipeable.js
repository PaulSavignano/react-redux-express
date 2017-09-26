import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'

import sectionContainer from '../../containers/sections/sectionContainer'
import renderComponents from './renderComponents'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

class SectionSwipeable extends Component {
  render() {
    const {
      autoplay,
      item: {
        items
      },
      style
    } = this.props
    return (
      <section style={style}>
        <AutoPlaySwipeableViews
          autoplay={autoplay}
          interval={4000}
          animateTransitions={true}
          springConfig={{
            duration: '4s',
            easeFunction: 'ease-in-out',
            delay: '-1s'
          }}
          className="AutoPlaySwipeableViews"
        >
          {renderComponents({ components: items })}
        </AutoPlaySwipeableViews>
      </section>
    )
  }
}

SectionSwipeable.propTypes = {
  autoplay: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
}

export default sectionContainer(SectionSwipeable)
