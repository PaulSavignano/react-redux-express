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
      containerProps,
      item: {
        _id,
        items,
        values: {
          pageLink
        }
      },
      sectionProps
    } = this.props
    return (
      <div {...containerProps}>
        <section {...sectionProps} id={pageLink || _id}>
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
  containerProps: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  sectionProps: PropTypes.object.isRequired
}

export default sectionContainer(SectionSwipeable)
