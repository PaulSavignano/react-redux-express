import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import RaisedButton from 'material-ui/RaisedButton'

import sectionCarouselContainer from '../../containers/carousels/sectionCarouselContainer'
import SwipeableView from './SwipeableView'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const SwipeableSection = ({
  dispatch,
  editItem,
  item,
  swipeableStyle
}) => (
  <div>
    <AutoPlaySwipeableViews
      autoplay={editItem.autoplay}
    >
      {item.views.map(view => (
        <SwipeableView
          dispatch={dispatch}
          editItem={editItem}
          item={view}
          key={view._id}
          swipeableStyle={swipeableStyle}
        />
      ))}
    </AutoPlaySwipeableViews>
  </div>
)

SwipeableSection.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editItem: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  swipeableStyle: PropTypes.object.isRequired
}

export default sectionCarouselContainer(SwipeableSection)
