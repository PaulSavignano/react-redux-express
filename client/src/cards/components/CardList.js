import React from 'react'

import CardItem from './CardItem'

const CardList = ({ isFetching, section, cards }) => (
!cards.length ? null :
  <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
    {cards.map(card => (
      <CardItem
        key={card._id}
        card={card}
        section={section}
      />
    ))}
  </div>
)

export default CardList
