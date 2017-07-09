import React from 'react'
import { connect } from 'react-redux'

import CardItem from '../../components/cards/CardItem'

const CardItemContainer = ({ dispatch, item, isFetching }) => (
  !isFetching && <CardItem item={item} dispatch={dispatch} />
)

const mapStateToProps = ({ cards: { items, isFetching } }, { componentId }) => {
  const item = items.find(item => item._id === componentId)
  return {
    item,
    isFetching
  }
}

export default connect(mapStateToProps)(CardItemContainer)
