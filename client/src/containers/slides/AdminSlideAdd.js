import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

import AdminSlideEdit from './AdminSlideEdit'
import { fetchAdd, toggleCarousel } from '../../actions/slides'


const AdminSlideAdd = ({ dispatch, page, items }) => {
  const editItem = items.find(item => item.editing === true)
  return (
    <section className="button-container">
      <RaisedButton
        label="Add Slide"
        primary={true}
        className="button"
        onTouchTap={() => dispatch(fetchAdd({ pageId: page._id, pageSlug: page.slug }))}
      />
      {!items.length ? null :
      <RaisedButton
        label="Edit Slides"
        primary={true}
        className="button"
        onTouchTap={() => dispatch(toggleCarousel())}
      />}
      {editItem && <AdminSlideEdit item={editItem} />}
    </section>
  )
}



export default connect()(AdminSlideAdd)
