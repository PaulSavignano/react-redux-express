import React from 'react'

import AdminSlideItem from './AdminSlideItem'

const AdminSlideList = ({ section, slides, imageSpec }) => (
  slides.length < 1 ? null  :
  <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%' }}>
    {slides.map(slide => (
      <AdminSlideItem
        key={slide._id}
        slide={slide}
        section={section}
        initialValues={slide.values}
        imageSpec={imageSpec}
      />
    ))}
  </div>
)

export default AdminSlideList
