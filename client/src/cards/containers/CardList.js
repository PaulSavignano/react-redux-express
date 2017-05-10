import React from 'react'
import { connect } from 'react-redux'

import CardItem from '../components/CardItem'

const CardList = ({ isFetching, page, cards }) => {
  return (
    isFetching ? null :
    <div>
      {cards.length > 0 ?
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
        <section><h3>No items yet</h3></section>
      }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.page)
  const isFetching = state.cards.isFetching
  const cards = isFetching ? [] : state.cards.items.filter(item => item.pageId === ownProps.page._id)
  return {
    isFetching,
    cards
  }
}

export default connect(mapStateToProps)(CardList)
