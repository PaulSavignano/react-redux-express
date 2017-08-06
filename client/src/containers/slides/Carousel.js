import React from 'react'
import { connect } from 'react-redux'
import { CardMedia } from 'material-ui/Card'
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'

import { toggleCarousel } from '../../actions/slides'
import loadImages from '../images/loadImages'

const Carousel = ({
  dispatch,
  items,
  open,
  autoplay
}) => {
  console.log(items)
  return (
    <div>
      <AutoRotatingCarousel
        label="Get started"
        autoplay={autoplay}
        open={open}
        mobile={true}
        onStart={() => dispatch(toggleCarousel(!open))}
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
              media={<CardMedia><img src={item.image.src} alt={title} /></CardMedia>}
              mediaBackgroundStyle={{ backgroundColor: mediaBackgroundColor, overflow: 'hidden' }}
              contentStyle={{ backgroundColor: contentBackgroundColor }}
              title={title}
              subtitle={subtitle}
              textStyle={{ color }}
            />
          )
        })}
      </AutoRotatingCarousel>
    </div>
  )
}



export default connect()(loadImages(Carousel))
