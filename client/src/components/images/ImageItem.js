import React from 'react'
import { Card, CardMedia } from 'material-ui/Card'

import imageContainer from '../../containers/images/imageContainer'
import loadImage from '../../containers/images/loadImage'

const ImageItem  = ({
  item: {
    image,
    values: {
      flex,
      margin,
      text,
      width,
      zDepth
    }
  }
}) => (
  <Card zDepth={zDepth}>
    <CardMedia><img src={image.src} alt="card"/></CardMedia>
  </Card>
)

export default imageContainer(loadImage(ImageItem))
