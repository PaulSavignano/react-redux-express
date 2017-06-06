import React from 'react'

import AdminCarouselItem from '../components/AdminCarouselItem'

const AdminCarouselList = ({ section, carousels, imageSize, placeholdIt }) => (
  carousels.length < 1 ? null  :
  <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%' }}>
    {carousels.map(carousel => (
      <AdminCarouselItem
        key={carousel._id}
        carousel={carousel}
        section={section}
        initialValues={carousel.values}
        imageSize={imageSize}
        placeholdIt={placeholdIt}
      />
    ))}
  </div>
)

export default AdminCarouselList
