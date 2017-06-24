import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'

const SlideItem = ({ slide, muiTheme }) => {
  const { image, values } = slide
  return (
    <div style={{ margin: '0 auto 0 auto'}}>
      <img src={image.src} alt="card" style={{ padding: 10, margin: '0 auto' }}/>
      <div style={{ textAlign: 'center', fontSize: 24, padding: 10, fontStyle: 'italic', fontFamily: muiTheme.fontFamily, color: muiTheme.palette.textColor }}>
        {values.text}
      </div>
    </div>
  )
}

export default muiThemeable()(SlideItem)
