import React from 'react'
import PropTypes from 'prop-types'
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
  editCarousel,
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
          carousel={carousel}
          dispatch={dispatch}
          editCarousel={editCarousel}
          editSlide={editSlide}
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

AdminAppCarouselButtons.propTypes = {
  adminAppOpen: PropTypes.bool.isRequired,
  autoplay: PropTypes.bool.isRequired,
  carousel: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  editCarousel: PropTypes.object,
  editSlide: PropTypes.object
}

export default appCarouselContainer(AdminAppCarouselButtons)
