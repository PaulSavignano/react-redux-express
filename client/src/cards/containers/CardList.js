import React from 'react'
import { connect } from 'react-redux'

import CardItem from '../components/CardItem'

const CardList = ({ isFetching, page, items, cards, iFrame }) => {
  return (
    isFetching ? null : items.length ?
    <div>
      <section>
        {cards.map(item => (
          <CardItem
            key={item._id}
            item={item}
            page={page}
          />
        ))}
      </section>
      <div style={{
        backgroundColor: '#e4e4e4',
        margin: '60px 0 0 0',
        padding: '30px 0 60px 0'
      }}>
        <section>
          <h1 style={{ textAlign: 'center', paddingBottom: 30 }}>WHAT PEOPLE ARE SAYING ABOUT AUSSIE MOVING...</h1>
          <CardItem key={iFrame._id} item={iFrame} />
        </section>
      </div>

    </div>

    :
      null
  )
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.page)
  const isFetching = state.cards.isFetching
  const items = isFetching ? [] : state.cards.items.filter(item => item.pageId === ownProps.page._id)
  const cards = isFetching ? [] : items.filter(item => !item.values.iFrame)
  const iFrame = isFetching ? [] : items.find(item => item.values.iFrame)
  console.log(cards)
  return {
    isFetching,
    items,
    cards,
    iFrame
  }
}

export default connect(mapStateToProps)(CardList)
