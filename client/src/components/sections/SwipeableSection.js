import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'

import swipeableContainer from '../../containers/sections/swipeableContainer'
import renderComponents from './renderComponents'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

class SwipeableSection extends Component {
  render() {
    const {
      autoplay,
      item: {
        items
      },
      propsForParent,
      propsForChild,
    } = this.props
    return (
      <section {...propsForParent}>
        <AutoPlaySwipeableViews
          autoplay={autoplay}
          slideStyle={propsForChild.style}
          interval={5000}
          animateTransitions={false}
          springConfig={{
            duration: '1s',
            opacity: 1,
            easeFunction: 'opacity 300ms ease-in 200ms',
            delay: '0s'
          }}
        >
          {renderComponents({ components: items })}
        </AutoPlaySwipeableViews>
      </section>
    )
  }
}

SwipeableSection.propTypes = {
  autoplay: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
}

export default swipeableContainer(SwipeableSection)
