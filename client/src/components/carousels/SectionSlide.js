import React from 'react'
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card'

const SectionSlide = ({
  dispatch,
  slide: {
    image,
    values: {
      mediaBackgroundColor,
      contentBackgroundColor,
      color,
      title,
      subtitle,
    }
  }
}) => (
  <Card
    zDepth={0}
  >
    {image && image.src &&
      <CardMedia>
        <img src={image.src} alt="section carousel slide"/>
      </CardMedia>
    }
    <CardTitle title={title} style={{ color }}/>
    <CardText style={{ color }}>{subtitle}</CardText>
  </Card>
)


export default SectionSlide
