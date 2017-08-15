import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import AdminSlideEdit from './AdminSlideEdit'
import { fetchAdd, fetchAddSub, toggleAdminPageCarousel } from '../../actions/carousels'

const AdminPageCarouselButtons = ({
  adminOpen,
  carousel,
  dispatch,
  editSlideId
}) => {
  const editSlide = editSlideId && carousel.slides.find(item => item._id === editSlideId)
  return (
    carousel ?
    <div className="button-container">
      <RaisedButton
        label="Add Slide"
        primary={true}
        className="button"
        onTouchTap={() => dispatch(fetchAddSub(carousel._id))}
      />
      <RaisedButton
        label="Edit Slides"
        primary={true}
        className="button"
        onTouchTap={() => dispatch(toggleAdminPageCarousel(!adminOpen))}
      />
      {editSlideId && <AdminSlideEdit slide={editSlide} />}
    </div>
      :
    <div className="button-container">
      <RaisedButton
        label="Add Carousel"
        primary={true}
        className="button"
        onTouchTap={() => dispatch(fetchAdd(carousel._id))}
      />
      {editSlideId && <AdminSlideEdit slide={editSlide} />}
    </div>
  )
}



export default AdminPageCarouselButtons
