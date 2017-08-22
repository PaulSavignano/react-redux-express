import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import RaisedButton from 'material-ui/RaisedButton'

import sectionCarouselContainer from '../../containers/carousels/sectionCarouselContainer'
import AdminSectionSlide from './AdminSectionSlide'
import AdminSectionCarouselEdit from './AdminSectionCarouselEdit'
import AdminSlideEdit from './AdminSlideEdit'
import { fetchAddSub, startEditCarousel } from '../../actions/carousels'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

class AdminSectionCarousel extends Component {
  handleEditCarousel = () => {
    const { dispatch, carousel } = this.props
    return dispatch(startEditCarousel(carousel._id))
  }
  handleAddSlide = () => {
    const { dispatch, carousel } = this.props
    return dispatch(fetchAddSub(carousel._id))
  }
  render() {
    const {
      autoplay,
      dispatch,
      carousel,
      editCarousel,
      editSlide
    } = this.props
    const openCarousel = editCarousel ? true : false
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
            onTouchTap={this.handleEditCarousel}
          />
          <RaisedButton
            label="Add Slide"
            primary={true}
            className="button"
            onTouchTap={this.handleAddSlide}
          />
        </div>

        {openCarousel &&
          <AdminSectionCarouselEdit
            carousel={carousel}
            dispatch={dispatch}
            form={`carousel_${editCarousel._id}`}
            initialVaues={editCarousel.values}
            open={openCarousel}
          />
        }
        {openSlide &&
          <AdminSlideEdit
            carouselId={carousel._id}
            dispatch={dispatch}
            form={`slide_${editSlide._id}`}
            initialVaues={editSlide.values}
            slide={editSlide}
            open={openSlide}
          />
        }
      </div>
    )
  }
}

AdminSectionCarousel.propTypes = {
  autoplay: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  carousel: PropTypes.object.isRequired,
  editCarousel: PropTypes.object,
  editSlide: PropTypes.object
}

export default sectionCarouselContainer(AdminSectionCarousel)
