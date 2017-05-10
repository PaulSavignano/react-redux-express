import React from 'react'
import AdminCarouselItem from './AdminCarouselItem'

const AdminCarouselList = ({ page, carousel }) => {
  return (
    carousel.length > 0 ?
    <div>
      {carousel.map(item => (
        <AdminCarouselItem
          key={item._id}
          page={page}
          carousel={carousel}
          item={item}
        />
      ))}
    </div>
    :
    <section><h3>No carousel slides yet</h3></section>
  )
}




export default AdminCarouselList
