import React from 'react'
import { connect } from 'react-redux'

import CardList from '../components/CardList'

const Cards = ({ isFetching, section, items }) => {
  return (
    isFetching ? null : !items.length ? null :
    <div style={{ maxWidth: 1044, margin: '0 auto' }}>
      <CardList section={section} items={items} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.cards.isFetching,
  items: state.cards.items.filter(item => item.sectionId === ownProps.section._id)
})

export default connect(mapStateToProps)(Cards)
