import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import appCarouselContainer from '../../containers/carousels/appCarouselContainer'
import AdminAppCarousel from './AdminAppCarousel'
import AdminSlideEdit from './AdminSlideEdit'
import { fetchAdd, fetchAddSub, toggleAdminAppCarousel } from '../../actions/carousels'

const AdminAppCarouselButtons = ({
  adminAppOpen,
  autoplay,
  carousel,
  dispatch,
  editCarouselId,
  editSlide,
}) => {
  const open = editSlide ? true : false
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
        onTouchTap={() => dispatch(toggleAdminAppCarousel(!adminAppOpen))}
      />
      {open &&
        <AdminSlideEdit
          carouselId={carousel._id}
          slide={editSlide}
          open={open}
        />
      }
      {adminAppOpen &&
        <AdminAppCarousel
          adminAppOpen={adminAppOpen}
          autoplay={autoplay}
          editCarouselId={editCarouselId}
          editSlide={editSlide}
          dispatch={dispatch}
          carousel={carousel}
        />
      }
    </div>
      :
    <div className="button-container">
      <RaisedButton
        label="Add Carousel"
        primary={true}
        className="button"
        onTouchTap={() => dispatch(fetchAdd({ pathname: '/' }))}
      />
      {open &&
        <AdminSlideEdit
          carouselId={carousel._id}
          slide={editSlide}
          open={open}
        />
      }
      {adminAppOpen &&
        <AdminAppCarousel />
      }
    </div>
  )
}



export default appCarouselContainer(AdminAppCarouselButtons)
