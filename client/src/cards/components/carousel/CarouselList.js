import React from 'react'
import CarouselItem from './CarouselItem'

const CarouselList = ({ page, card }) => {
  console.log(card.carousel)
  return (
    card.carousel.length > 0 ?
    <div>
      {card.carousel.map(item => (
        <CarouselItem
          key={item._id}
          page={page}
          card={card}
          item={item}
        />
      ))}
    </div>
    :
    <section><h3>No carousel slides yet</h3></section>
  )
}




export default CarouselList
