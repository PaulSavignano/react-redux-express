import React from 'react'
import CardItem from './CardItem'

const CardList = ({ page, cards }) => {
  return (
    cards.length > 0 ?
      <section>
        {cards.map(card => (
          <CardItem
            key={card._id}
            card={card}
            page={page}
          />
        ))}
      </section>
    :
      <section><h3>No cards yet</h3></section>
  )
}

export default CardList
