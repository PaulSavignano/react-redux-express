import React from 'react'

import CardList from '../components/CardList'

const Cards = ({ isFetching, section, cards }) => {
  return (
    isFetching ? null : !cards.length ? null :
    <div style={{ maxWidth: 1044, margin: '0 auto' }}>
      <CardList section={section} cards={cards} />
    </div>
  )
}


export default Cards
