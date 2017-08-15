import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import RaisedButton from 'material-ui/RaisedButton'

import sectionCarouselContainer from '../../containers/carousels/sectionCarouselContainer'
import AdminSectionSlide from './AdminSectionSlide'
import AdminCarouselEdit from './AdminCarouselEdit'
import AdminSlideEdit from './AdminSlideEdit'
import { fetchAddSub, startEditCarousel } from '../../actions/carousels'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const AdminSectionCarousel = ({
  autoplay,
  dispatch,
  editCarouselId,
  editSlide,
  carousel
}) => {
  const openCarousel = carousel._id === editCarouselId ? true : false
  const openSlide = editSlide ? true : false
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
            editSlide={editSlide}
          />
        ))}
      </AutoPlaySwipeableViews>
      <div className="button-container">
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
      </div>

      {openCarousel && <AdminCarouselEdit carousel={carousel} open={openCarousel} />}
      {openSlide && <AdminSlideEdit carouselId={carousel._id} slide={editSlide} open={openSlide} />}
    </div>
  )
}

export default sectionCarouselContainer(AdminSectionCarousel)
