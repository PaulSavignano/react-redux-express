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
      item: { items, kind, values },
    } = this.props
    const backgroundColor = values && values.backgroundColor
    const pageLink = values && values.pageLink
    return (
      <section
        className="swipeable-section"
      >
        <AutoPlaySwipeableViews
          autoplay={autoplay}
        >
          {renderComponents({ components: items, kind })}
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
