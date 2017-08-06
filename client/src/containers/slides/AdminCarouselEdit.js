import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

import AdminSlideEdit from './AdminSlideEdit'
import { fetchAdd, toggleAdminCarousel } from '../../actions/slides'

const AdminCarouselEdit = ({ dispatch, items, adminOpen }) => {
  const editItem = items.find(item => item.editing === true)
  return (
    <div className="button-container">
      <RaisedButton
        label="Add Slide"
        primary={true}
        className="button"
        onTouchTap={() => dispatch(fetchAdd())}
      />
      {!items.length ? null :
      <RaisedButton
        label="Edit Slides"
        primary={true}
        className="button"
        onTouchTap={() => dispatch(toggleAdminCarousel(!adminOpen))}
      />}
      {editItem && <AdminSlideEdit item={editItem} />}
    </div>
  )
}



export default connect()(AdminCarouselEdit)
