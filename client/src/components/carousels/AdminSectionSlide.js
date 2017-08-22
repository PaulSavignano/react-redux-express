import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card'

import { startEditSlide } from '../../actions/carousels'
import AdminSlideEdit from './AdminSlideEdit'

const AdminSectionSlide = ({
  carousel,
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
      {open &&
        <AdminSlideEdit
          carouselId={carousel._id}
          dispatch={dispatch}
          form={`slide_${editSlide._id}`}
          initialVaues={editSlide.values}
          editSlide={editSlide}
          open={open}
        />
      }
    </Card>
  )
}

AdminSectionSlide.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  carousel: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  slide: PropTypes.object.isRequired
}

export default AdminSectionSlide
