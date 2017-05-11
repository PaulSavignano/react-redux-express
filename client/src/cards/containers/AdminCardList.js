import React from 'react'
import { connect } from 'react-redux'

import AdminCardAdd from '../components/AdminCardAdd'
import AdminCardItem from '../components/AdminCardItem'

const AdminCardList = ({ isFetching, page, items }) => {
  return (
    isFetching ? null :
    <div>
      <section><AdminCardAdd page={page} /></section>
      {items.length > 0 ?
        <section>
          {items.map(item => (
            <AdminCardItem
              key={item._id}
              item={item}
              page={page}
              initialValues={item.values}
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
  const isFetching = state.cards.isFetching
  const items = isFetching ? null : state.cards.items.filter(item => item.pageId === ownProps.page._id)
  return {
    isFetching,
    items
  }
}

export default connect(mapStateToProps)(AdminCardList)
