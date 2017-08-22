import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CardMedia } from 'material-ui/Card'
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'

import appCarouselContainer from '../../containers/carousels/appCarouselContainer'
import { toggleAppCarousel } from '../../actions/carousels'

class AppCarousel extends Component {
  handleStart = () => {
    const { appOpen, dispatch } = this.props
    return dispatch(toggleAppCarousel(!appOpen))
  }
  render() {
    const {
      appOpen,
      autoplay,
      dispatch,
      carousel,
    } = this.props
    return (
      <div>
        <AutoRotatingCarousel
          label="Get started"
          autoplay={autoplay}
          open={appOpen}
          mobile={true}
          onStart={this.handleStart}
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
}

AppCarousel.propTypes = {
  appOpen: PropTypes.bool.isRequired,
  autoplay: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  carousel: PropTypes.object.isRequired,
}

export default appCarouselContainer(AppCarousel)
