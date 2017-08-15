import React from 'react'
import { connect } from 'react-redux'
import { CardMedia } from 'material-ui/Card'
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'

import carouselContainer from '../../containers/carousels/carouselContainer'
import { toggleAdminPageCarousel } from '../../actions/carousels'

const PageCarousel = ({
  adminOpen,
  autoplay,
  editCarouselId,
  editSlideId,
  dispatch,
  carousel,
}) => {
  return (
    <div>
      <AutoRotatingCarousel
        label="Get started"
        autoplay={autoplay}
        open={adminOpen}
        mobile={true}
        onStart={() => dispatch(toggleAdminPageCarousel(!adminOpen))}
      >
        {carousel.slides.map(slide => {
          const {
            color,
            mediaBackgroundColor,
            contentBackgroundColor,
            title,
            subtitle
          } = slide.values
          const open = slide._id === editSlideId ? true : false
          return (
            <div>
              <Slide
                key={slide._id}
                media={
                  <CardMedia
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
            </div>
          )
        })}
      </AutoRotatingCarousel>
    </div>
  )
}

export default carouselContainer(PageCarousel)
