import React from 'react'
import AdminCard from './AdminCard'

const AdminCardList = ({ cards, page }) => {
  console.log(cards)
  return (
    cards.length > 0 ?
      <section>
        {cards.map(card => (
          <AdminCard
            key={card._id}
            card={card}
            page={page}
            initialValues={card.values}
          />
        ))}
      </section>
    :
      <section><h3>No products yet</h3></section>
  )
}


export default AdminCardList
