import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CardMedia } from 'material-ui/Card'
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'

import appCarouselContainer from '../../containers/carousels/appCarouselContainer'
import { toggleAppCarousel } from '../../actions/carousels'

const AppCarousel = ({
  autoplay,
  dispatch,
  carousel,
  appOpen
}) => {
  return (
    <div>
      <AutoRotatingCarousel
        label="Get started"
        autoplay={autoplay}
        open={appOpen}
        mobile={true}
        onStart={() => dispatch(toggleAppCarousel(!appOpen))}
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
    </div>
  )
}

export default appCarouselContainer(AppCarousel)
