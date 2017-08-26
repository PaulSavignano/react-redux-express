import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import RaisedButton from 'material-ui/RaisedButton'

import SwipeableView from './SwipeableView'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const SwipeableSection = ({
  autoplay,
  item: { items, values },
}) => (
  <div
    style={{ backgroundColor: values && values.backgroundColor }}
    className="swipeable-section"
  >
    <AutoPlaySwipeableViews
      autoplay={autoplay}
    >
      {items.map(item => (
        <SwipeableView
          item={item}
          key={item._id}
        />
      ))}
    </AutoPlaySwipeableViews>
  </div>
)

SwipeableSection.propTypes = {
  autoplay: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
}

export default connect(({ swipeables: { autoplay }}) => ({ autoplay }))(SwipeableSection)
