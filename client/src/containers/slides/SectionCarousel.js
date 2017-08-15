import React from 'react'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const SectionCarousel = ({ isFetching, items }) => (
  <AutoPlaySwipeableViews>
    {items.map(item => (
      <div key={item._id}>
        <div>{item.mediaBackgroundColor}</div>
        <div>{item.contentBackgroundColor}</div>
        <div>{item.color}</div>
        <div>{item.title}</div>
        <div>{item.subtitle}</div>
      </div>
    ))}
  </AutoPlaySwipeableViews>
)

const mapStateToProps = ({
  slides: { isFetching, items }
}, {
  slides
}) => {
  return {
    isFetching,
    items: !isFetching ? slides.map(slide => items.find(item => item._id === slide.componentId)) : []
  }
}

export default connect(mapStateToProps)(SectionCarousel)
