import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'

import sectionContainer from '../../containers/sections/sectionContainer'
import ComponentSwitch from './ComponentSwitch'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

class SectionSwipeable extends Component {
  render() {
    const {
      autoplay,
      item: {
        _id,
        items,
        values: {
          pageLink
        }
      },
      propsForChild,
      propsForParent,
    } = this.props
    return (
      <div {...propsForParent}>
        <section {...propsForChild} id={pageLink || _id}>
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
            {items.map(component => (
              <ComponentSwitch
                component={component}
                key={component.item._id}
              />
            ))}
          </AutoPlaySwipeableViews>
        </section>
      </div>
    )
  }
}

SectionSwipeable.propTypes = {
  autoplay: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  propsForChild: PropTypes.object.isRequired,
  propsForParent: PropTypes.object.isRequired,
}

export default sectionContainer(SectionSwipeable)
