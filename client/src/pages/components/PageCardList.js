import React from 'react'
import PageCard from './PageCard'

const PageCardList = ({ cards, page }) => {
  return (
    cards.length > 0 ?
      <section>
        {cards.map(card => (
          <PageCard
            key={card._id}
            {...card}
            page={page}
            initialValues={card.values}
          />
        ))}
      </section>
    :
      <section><h3>No products yet</h3></section>
  )
}


export default PageCardList
