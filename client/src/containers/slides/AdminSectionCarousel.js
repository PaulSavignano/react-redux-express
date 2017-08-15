import React from 'react'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import RaisedButton from 'material-ui/RaisedButton'

import AdminCarouselEdit from './AdminCarouselEdit'
import AdminSlideEdit from './AdminSlideEdit'
import { fetchAdd, startEdit } from '../../actions/slides'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const AdminSectionCarousel = ({
  adminOpen,
  autoplay,
  dispatch,
  editItem,
  isFetching,
  items,
  page,
  sectionId
}) => (
  isFetching ? null :
  <div>
    <AutoPlaySwipeableViews autoplay={autoplay}>
      {items.map(item => (
        <div key={item._id} onTouchTap={() => dispatch(startEdit(item._id))}>
          <div>{item.values.mediaBackgroundColor}</div>
          <div>{item.values.contentBackgroundColor}</div>
          <div>{item.values.color}</div>
          <div>{item.values.title}</div>
          <div>{item.values.subtitle}</div>
        </div>
      ))}
    </AutoPlaySwipeableViews>
    <RaisedButton
      label="Add Slide"
      primary={true}
      className="button"
      onTouchTap={() => {
        const add = { pageId: page._id, pageSlug: page.slug, sectionId }
        dispatch(fetchAdd(add))
      }}
    />
    {editItem && <AdminSlideEdit item={editItem} />}
  </div>
)

const mapStateToProps = ({
  slides: { adminOpen, autoplay, isFetching, items }
}, {
  slides
}) => {
  const slideItems = !isFetching ? slides.map(slide => items.find(item => item._id === slide.componentId)) : []
  const editItem = !isFetching && slideItems.find(item => item.editing === true)
  return {
    adminOpen,
    autoplay,
    isFetching,
    items,
    editItem
  }
}

export default connect(mapStateToProps)(AdminSectionCarousel)
