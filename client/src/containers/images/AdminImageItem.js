import React from 'react'
import { Card, CardMedia, CardText } from 'material-ui/Card'

import imageContainer from './imageContainer'
import adminLoadImage from './adminLoadImage'
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
      text,
      width,
      zDepth
    }
  } = item
  return (
    <Card onTouchTap={() => dispatch(startEdit(_id))} zDepth={zDepth}>
      <CardMedia><img src={image.src} alt="card"/></CardMedia>
      {editing && <AdminImageEdit item={item} />}
    </Card>
  )
}

export default imageContainer(adminLoadImage(AdminImageItem))
