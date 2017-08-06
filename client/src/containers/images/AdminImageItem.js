import React from 'react'
import { Card, CardMedia } from 'material-ui/Card'

import imageContainer from './imageContainer'
import loadImage from './loadImage'
import AdminImageEdit from './AdminImageEdit'
import { startEdit } from '../../actions/images'

const AdminImageItem  = ({
  dispatch,
  item
}) => {
  const {
    _id,
    editing,
    image,
    values: {
      flex,
      margin,
      width,
      zDepth
    }
  } = item
  return (
    <Card
      onTouchTap={() => dispatch(startEdit(_id))}
      zDepth={zDepth}
      style={{ flex, margin, width, zDepth }}
    >
      <CardMedia><img src={image.src} alt="card"/></CardMedia>
      {editing && <AdminImageEdit item={item} />}
    </Card>
  )
}

export default imageContainer(loadImage(AdminImageItem))
