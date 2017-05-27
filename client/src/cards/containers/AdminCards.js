import React from 'react'
import { connect } from 'react-redux'

import AdminCardAdd from '../components/AdminCardAdd'
import AdminCardList from '../components/AdminCardList'

const imageSize = {
  width: 900,
  height: 600
}
const placeholdIt = `https://placehold.it/${imageSize.width}x${imageSize.height}`

const AdminCards = ({ isFetching, section, items }) => {
  return (
    isFetching ? null :
    <section style={{ display: 'flex', flexFlow: 'row wrap', width: '100%' }}>
      <AdminCardAdd section={section} imageSize={imageSize} placeholdIt={placeholdIt} />
      <AdminCardList section={section} items={items} imageSize={imageSize} placeholdIt={placeholdIt} />
    </section>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.cards.isFetching,
  items: state.cards.items.filter(item => item.sectionId === ownProps.section._id)
})

export default connect(mapStateToProps)(AdminCards)
