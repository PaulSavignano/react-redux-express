import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CardMedia } from 'material-ui/Card'
import { Slide } from 'material-auto-rotating-carousel'

import { startEditSlide, toggleAdminAppCarousel } from '../../actions/carousels'

class AdminAppSlide extends Component {
  handleStartSlideEdit = () => {
    const { dispatch, slide } = this.props
    return dispatch(startEditSlide(slide._id))
  }
  render() {
    const {
      color,
      contentBackgroundColor,
      mediaBackgroundColor,
      slide,
      subtitle,
      title
    } = this.props
    return (
      <Slide
        key={slide._id}
        media={
          <CardMedia
            onTouchTap={this.handleStartSlideEdit}
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
  }
}

AdminAppSlide.propTypes = {
  color: PropTypes.string.isRequired,
  contentBackgroundColor: PropTypes.string.isRequired,
  mediaBackgroundColor: PropTypes.string.isRequired,
  slide: PropTypes.object.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default AdminAppSlide
