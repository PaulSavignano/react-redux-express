import React from 'react'

const SlideItem = ({ slide: { image, values } }) => (
  <div style={{ margin: '0 auto 0 auto'}}>
    <img src={image.src} alt="card" style={{ padding: 10, margin: '0 auto' }}/>
    <div style={{ textAlign: 'center', fontSize: 24, padding: 10, fontStyle: 'italic' }}>
      {values.text}
    </div>
  </div>
)

export default SlideItem
