import React from 'react'

import { startEditSlide } from '../../actions/carousels'
import AdminSlideEdit from './AdminSlideEdit'

const AdminSectionSlide = ({
  carouselId,
  dispatch,
  editSlideId,
  slide
}) => {
  const open = slide._id === editSlideId ? true : false
  return (
    <div key={slide._id} onTouchTap={() => dispatch(startEditSlide(slide._id))}>
      <div>{slide.values.mediaBackgroundColor}</div>
      <div>{slide.values.contentBackgroundColor}</div>
      <div>{slide.values.color}</div>
      <div>{slide.values.title}</div>
      <div>{slide.values.subtitle}</div>
      {open && <AdminSlideEdit carouselId={carouselId} slide={slide} open={open} />}
    </div>
  )
}

export default AdminSectionSlide
