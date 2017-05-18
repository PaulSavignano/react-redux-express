import React from 'react'
import { connect } from 'react-redux'

import AdminCardAdd from '../components/AdminCardAdd'
import AdminCardList from '../components/AdminCardList'

const AdminCards = ({ isFetching, section, items }) => {
  return (
    isFetching ? null :
    <div>
      <section><AdminCardAdd section={section} /></section>
      <AdminCardList section={section} items={items} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.cards.isFetching,
  items: state.cards.items.filter(item => item.sectionId === ownProps.section._id)
})

export default connect(mapStateToProps)(AdminCards)
