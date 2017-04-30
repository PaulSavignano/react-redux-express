import React from 'react'
import AdminPageCard from './AdminPageCard'

const AdminPageCardList = ({ cards, page }) => {
  return (
    cards.length > 0 ?
    <section>
      {cards.map(card => (
        <AdminPageCard
          key={card._id}
          card={card}
          page={page}
          initialValues={card.values}
        />
      ))}
    </section> :
    <section><h3>No products yet</h3></section>
  )
}


export default AdminPageCardList
