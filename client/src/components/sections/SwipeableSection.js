import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import RaisedButton from 'material-ui/RaisedButton'

import swipeableContainer from '../../containers/sections/swipeableContainer'
import renderComponents from './renderComponents'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

class SwipeableSection extends Component {
  render() {
    const {
      autoplay,
      dispatch,
      item: {
        _id,
        items
      },
      propsForParent,
      propsForChild,
    } = this.props
    return (
      <section {...propsForParent}>
        <AutoPlaySwipeableViews
          autoplay={autoplay}
          slideStyle={propsForChild}
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
