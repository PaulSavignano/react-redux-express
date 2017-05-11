import React from 'react'
import { connect } from 'react-redux'

import CardItem from '../components/CardItem'

const CardList = ({ isFetching, page, items }) => {
  return (
    isFetching ? null : items.length ?
      <section>
        {items.map(item => (
          <CardItem
            key={item._id}
            item={item}
            page={page}
          />
        ))}
      </section>
    :
      null
  )
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.page)
  const isFetching = state.cards.isFetching
  const items = isFetching ? [] : state.cards.items.filter(item => item.pageId === ownProps.page._id)
  return {
    isFetching,
    items
  }
}

export default connect(mapStateToProps)(CardList)
