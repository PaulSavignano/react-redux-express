import React, { Component } from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'

const CarouselItem = ({ carousel, muiTheme }) => {
  const { image, values } = carousel
  let text
  if (carousel.values) {
    if (values.text) {
      text = values.text
    }
  }
  return (
      <div style={{ margin: '0 auto 0 auto'}}>
        <img src={image} alt="card" style={{ padding: 10, margin: '0 auto' }}/>
        <div style={{ textAlign: 'center', fontSize: 24, padding: 10, fontStyle: 'italic', fontFamily: muiTheme.fontFamily, color: muiTheme.palette.textColor }}>
          {text}
        </div>
      </div>
  )
}

export default muiThemeable()(CarouselItem)
