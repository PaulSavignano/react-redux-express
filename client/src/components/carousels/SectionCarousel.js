import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import RaisedButton from 'material-ui/RaisedButton'

import carouselContainer from '../../containers/carousels/carouselContainer'
import SectionSlide from './SectionSlide'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const AdminSectionCarousel = ({
  autoplay,
  dispatch,
  editCarouselId,
  editSlideId,
  carousel
}) => (
  <div>
    <AutoPlaySwipeableViews autoplay={autoplay}>
      {carousel.slides.map(slide => (
        <SectionSlide key={slide._id} dispatch={dispatch} slide={slide} />
      ))}
    </AutoPlaySwipeableViews>
  </div>
)

export default carouselContainer(AdminSectionCarousel)
