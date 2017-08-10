import React from 'react'
import { connect } from 'react-redux'
import { CardMedia } from 'material-ui/Card'
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'

import AdminSlideEdit from './AdminSlideEdit'
import { startEdit, toggleAdminCarousel } from '../../actions/slides'

const AdminCarousel = ({
  dispatch,
  isFetching,
  items,
  adminOpen,
  autoplay
}) => {
  const editItem = items.find(item => item.editing === true)
  return (
    <div>
      <AutoRotatingCarousel
        label="Get started"
        autoplay={autoplay}
        open={adminOpen}
        mobile={true}
        onStart={() => dispatch(toggleAdminCarousel(!adminOpen))}
      >
        {items.map(item => {
          const {
            color,
            mediaBackgroundColor,
            contentBackgroundColor,
            title,
            subtitle
          } = item.values
          return (
            <Slide
              key={item._id}
              media={
                <CardMedia onTouchTap={() => dispatch(startEdit(item._id))} mediaStyle={{ cursor: 'pointer', minHeight: 60, minWidth: 60 }}>
                  <img src={item.image.src} alt="carousel slide"/>
                </CardMedia>
              }
              mediaBackgroundStyle={{ backgroundColor: mediaBackgroundColor, overflow: 'hidden' }}
              contentStyle={{ backgroundColor: contentBackgroundColor }}
              title={title}
              subtitle={subtitle}
              textStyle={{ color }}
            />
          )
        })}
      </AutoRotatingCarousel>
      {editItem && <AdminSlideEdit item={editItem} />}
    </div>
  )
}

export default connect()(AdminCarousel)
