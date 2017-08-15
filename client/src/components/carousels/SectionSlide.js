import React from 'react'

const SectionSlide = ({
  dispatch,
  slide
}) => {
  return (
    <div>
      <div>{slide.values.mediaBackgroundColor}</div>
      <div>{slide.values.contentBackgroundColor}</div>
      <div>{slide.values.color}</div>
      <div>{slide.values.title}</div>
      <div>{slide.values.subtitle}</div>
    </div>
  )
}

export default SectionSlide
