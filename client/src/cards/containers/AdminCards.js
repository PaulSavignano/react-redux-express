import React from 'react'
import { connect } from 'react-redux'

import AdminCardAdd from '../components/AdminCardAdd'
import AdminCardList from '../components/AdminCardList'

const imageSize = {
  width: 900,
  height: 600
}
const placeholdIt = `https://placehold.it/${imageSize.width}x${imageSize.height}`

const AdminCards = ({ isFetching, section, cards }) => {
  return (
    isFetching ? null :
    <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%' }}>
      <AdminCardList section={section} cards={cards} imageSize={imageSize} placeholdIt={placeholdIt} />
      <AdminCardAdd section={section} imageSize={imageSize} placeholdIt={placeholdIt} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.cards.isFetching,
  cards: state.cards.items.filter(card => card.sectionId === ownProps.section._id)
})

export default connect(mapStateToProps)(AdminCards)
