import React from 'react'
import { Card, CardMedia } from 'material-ui/Card'

import imageContainer from '../../containers/images/imageContainer'
import loadImage from '../images/loadImage'

const Image  = ({
  item: {
    image,
    values: {
      elevation,
      margin
    }
  }
}) => (
  <Card zDepth={elevation} style={{ margin }}>
    <CardMedia><img src={image.src} alt="card"/></CardMedia>
  </Card>
)

export default imageContainer(loadImage(Image))
