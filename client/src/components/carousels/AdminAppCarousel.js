import React from 'react'
import { connect } from 'react-redux'
import { CardMedia } from 'material-ui/Card'
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'

import appCarouselContainer from '../../containers/carousels/appCarouselContainer'
import AdminSlideEdit from './AdminSlideEdit'
import { startEditSlide, toggleAdminAppCarousel } from '../../actions/carousels'

const AdminAppCarousel = ({
  adminAppOpen,
  autoplay,
  editCarouselId,
  editSlide,
  dispatch,
  carousel,
}) => {
  const open = editSlide ? true : false
  return (
    <div>
      <AutoRotatingCarousel
        label="Get started"
        autoplay={autoplay}
        open={adminAppOpen}
        mobile={true}
        onStart={() => dispatch(toggleAdminAppCarousel(!adminAppOpen))}
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
            <Slide
              key={slide._id}
              media={
                <CardMedia
                  onTouchTap={() => dispatch(startEditSlide(slide._id))}
                  mediaStyle={{ cursor: 'pointer', minHeight: 60, minWidth: 60 }}
                >
                  <img src={slide.image.src} alt="carousel slide"/>

                </CardMedia>
              }
              mediaBackgroundStyle={{ backgroundColor: mediaBackgroundColor, overflow: 'hidden' }}
              contentStyle={{ backgroundColor: contentBackgroundColor }}
              title={title}
              subtitle={subtitle}
              textStyle={{ color }}
            />
          )
        })}
      </AutoRotatingCarousel>
      {open && <AdminSlideEdit slide={editSlide} carouselId={carousel._id} open={open}/>}
    </div>
  )
}

export default AdminAppCarousel
