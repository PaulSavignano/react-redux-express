import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card'

const SectionSlide = ({
  slide: {
    image,
    values: {
      color,
      contentBackgroundColor,
      mediaBackgroundColor,
      title,
      subtitle
    }
  }
}) => (
  <Card
    zDepth={0}
  >
    {image.src &&
      <CardMedia>
        <img src={image.src} alt="section carousel slide"/>
      </CardMedia>
    }
    <CardTitle title={title} style={{ color }}/>
    <CardText style={{ color }}>{subtitle}</CardText>
  </Card>
)

SectionSlide.propTypes = {
  slide: PropTypes.object.isRequired,
}

export default SectionSlide
