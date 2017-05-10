import React from 'react'
import { connect } from 'react-redux'

import AdminCardAdd from '../components/AdminCardAdd'
import AdminCard from '../components/AdminCard'

const AdminCardList = ({ isFetching, page, cards }) => {
  return (
    isFetching ? null :
    <div>
      <section><AdminCardAdd page={page} /></section>
      {cards.length > 0 ?
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
        <section><h3>No items yet</h3></section>
      }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const isFetching = state.cards.isFetching
  const cards = isFetching ? null : state.cards.items.filter(item => item.pageId === ownProps.page._id)
  return {
    isFetching,
    cards
  }
}

export default connect(mapStateToProps)(AdminCardList)
