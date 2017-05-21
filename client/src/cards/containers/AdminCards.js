import React from 'react'
import { connect } from 'react-redux'

import AdminCardAdd from '../components/AdminCardAdd'
import AdminCardList from '../components/AdminCardList'

const imageSize = {
  width: 300,
  height: 200
}
const placeholdit = `https://placehold.it/${imageSize.width}x${imageSize.height}`

const AdminCards = ({ isFetching, section, items }) => {
  return (
    isFetching ? null :
    <div>
      <section><AdminCardAdd section={section} imageSize={imageSize} placeholdit={placeholdit} /></section>
      <AdminCardList section={section} items={items} imageSize={imageSize} placeholdit={placeholdit} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.cards.isFetching,
  items: state.cards.items.filter(item => item.sectionId === ownProps.section._id)
})

export default connect(mapStateToProps)(AdminCards)
