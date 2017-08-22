import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CardMedia } from 'material-ui/Card'
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'

import appCarouselContainer from '../../containers/carousels/appCarouselContainer'
import AdminAppSlide from './AdminAppSlide'
import AdminAddSlide from './AdminAppSlide'
import AdminSlideEdit from './AdminSlideEdit'
import { startEditSlide, toggleAdminAppCarousel } from '../../actions/carousels'

class AdminAppCarousel extends Component {
  handleToggleAdminAppCarousel = () => {
    const { dispatch, adminAppOpen } = this.props
    return dispatch(toggleAdminAppCarousel(!adminAppOpen))
  }
  render() {
    const {
      adminAppOpen,
      autoplay,
      carousel,
      dispatch,
      editCarousel,
      editSlide
    } = this.props
    const open = editSlide ? true : false
    return (
      <div>
        <AutoRotatingCarousel
          label="Get started"
          autoplay={autoplay}
          open={adminAppOpen}
          mobile={true}
          onStart={this.handleToggleAdminAppCarousel}
        >
          {carousel.slides.map(slide => {
            const {
              color,
              mediaBackgroundColor,
              contentBackgroundColor,
              title,
              subtitle
            } = slide.values
            return (
              <AdminAppSlide
                color={color}
                contentBackgroundColor={contentBackgroundColor}
                key={slide._id}
                mediaBackgroundColor={mediaBackgroundColor}
                slide={slide}
                subtitle={subtitle}
                title={title}
              />
            )
          })}
        </AutoRotatingCarousel>
        {open &&
          <AdminSlideEdit
            carouselId={carousel._id}
            dispatch={dispatch}
            form={`slide_${editSlide._id}`}
            initialVaues={editSlide.values}
            slide={editSlide}
            open={open}
          />
        }
      </div>
    )
  }
}

AdminAppCarousel.propTypes = {
  adminAppOpen: PropTypes.bool.isRequired,
  autoplay: PropTypes.bool.isRequired,
  carousel: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  editCarousel: PropTypes.object,
  editSlide: PropTypes.object
}

export default AdminAppCarousel
