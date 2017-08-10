import React from 'react'
import { Card, CardMedia } from 'material-ui/Card'

import imageContainer from '../../containers/images/imageContainer'
import loadImage from '../../containers/images/loadImage'

const ImageItem  = ({
  item: {
    image,
    values: {
      margin,
      zDepth
    }
  }
}) => (
  <Card zDepth={zDepth} style={{ margin }}>
    <CardMedia><img src={image.src} alt="card"/></CardMedia>
  </Card>
)

export default imageContainer(loadImage(ImageItem))
