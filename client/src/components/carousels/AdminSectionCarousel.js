import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import RaisedButton from 'material-ui/RaisedButton'

import carouselContainer from '../../containers/carousels/carouselContainer'
import AdminSectionSlide from './AdminSectionSlide'
import AdminCarouselEdit from './AdminCarouselEdit'
import AdminSlideEdit from './AdminSlideEdit'
import { fetchAddSub, startEditCarousel } from '../../actions/carousels'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const AdminSectionCarousel = ({
  autoplay,
  dispatch,
  editCarouselId,
  editSlideId,
  carousel
}) => {
  const openCarousel = carousel._id === editCarouselId ? true : false
  const openSlide = editSlideId ? true : false
  const editSlide = editSlideId && carousel.slides.find(slide => slide._id === editSlideId)
  return (
    <div>
      <AutoPlaySwipeableViews
        autoplay={autoplay}
      >
        {carousel.slides.map(slide => (
          <AdminSectionSlide
            key={slide._id}
            carouselId={carousel._id}
            dispatch={dispatch}
            slide={slide}
            editSlideId={editSlideId}
          />
        ))}
      </AutoPlaySwipeableViews>
      <RaisedButton
        label="Edit Carousel"
        primary={true}
        className="button"
        onTouchTap={() => dispatch(startEditCarousel(carousel._id))}
      />
      <RaisedButton
        label="Add Slide"
        primary={true}
        className="button"
        onTouchTap={() => {
          dispatch(fetchAddSub(carousel._id))
        }}
      />
      {openCarousel && <AdminCarouselEdit carousel={carousel} open={openCarousel} />}
      {openSlide && <AdminSlideEdit carouselId={carousel._id} slide={editSlide} open={openSlide} />}
    </div>
  )
}

export default carouselContainer(AdminSectionCarousel)
