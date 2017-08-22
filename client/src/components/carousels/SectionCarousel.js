import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import RaisedButton from 'material-ui/RaisedButton'

import sectionCarouselContainer from '../../containers/carousels/sectionCarouselContainer'
import SectionSlide from './SectionSlide'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const SectionCarousel = ({
  autoplay,
  dispatch,
  carousel
}) => (
  <div>
    <AutoPlaySwipeableViews autoplay={autoplay}>
      {carousel.slides.map(slide => (
        <SectionSlide
          key={slide._id}
          dispatch={dispatch}
          slide={slide}
        />
      ))}
    </AutoPlaySwipeableViews>
  </div>
)

SectionCarousel.propTypes = {
  autoplay: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  carousel: PropTypes.object.isRequired,
}

export default sectionCarouselContainer(SectionCarousel)
