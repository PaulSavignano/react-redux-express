import React from 'react'
import AdminPageCard from './AdminPageCard'

const styles = {
  grid: {
    display: 'flex',
    flexFlow: 'row wrap',
  }
}

const AdminPageCardList = ({ cards, page }) => {
  return (
    cards ?
    cards.length > 0 ?
    <div style={styles.grid}>
      {cards.map(card => (
        <AdminPageCard
          key={card._id}
          card={card}
          page={page}
          initialValues={card.contents}
        />
      ))}
    </div> :
    <div><p className="container__message">No products yet</p></div>
    :
    null
  )
}


export default AdminPageCardList
