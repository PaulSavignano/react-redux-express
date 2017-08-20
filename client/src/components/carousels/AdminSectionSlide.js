import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card'

import { startEditSlide } from '../../actions/carousels'
import AdminSlideEdit from './AdminSlideEdit'

const AdminSectionSlide = ({
  carouselId,
  dispatch,
  editSlide,
  slide
}) => {
  const {
    image,
    values: {
      mediaBackgroundColor,
      contentBackgroundColor,
      color,
      title,
      subtitle,
    }
  } = slide
  const open = editSlide ? true : false
  return (
    <Card onTouchTap={() => dispatch(startEditSlide(slide))} zDepth={0}>
      {image && image.src &&
        <CardMedia>
          <img src={image.src} alt="section carousel slide"/>
        </CardMedia>
      }
      <CardTitle title={title} style={{ color, textAlign: 'center' }}/>
      <CardText style={{ color, textAlign: 'center' }}>{subtitle}</CardText>
      {open && <AdminSlideEdit carouselId={carouselId} slide={editSlide} open={open} />}
    </Card>
  )
}

export default AdminSectionSlide
