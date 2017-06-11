import React from 'react'
import { connect } from 'react-redux'

import AdminCardAdd from '../components/AdminCardAdd'
import AdminCardList from '../components/AdminCardList'

// 1080 x 1920 height is 56.25% of width
const imageSize = {
  width: 1012,
  height: 675
}

const AdminCards = ({ isFetching, section, cards }) => {
  return (
    isFetching ? null :
    <AdminCardList section={section} cards={cards} imageSize={imageSize} />
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.cards.isFetching
})

export default connect(mapStateToProps)(AdminCards)
