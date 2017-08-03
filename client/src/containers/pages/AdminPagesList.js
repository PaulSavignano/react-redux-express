import React from 'react'
import { connect } from 'react-redux'

import AdminPagesItem from './AdminPagesItem'

const AdminPagesList = ({ isFetching, items }) => (
  !isFetching &&
  <div>
    {items.map(item => (
      <AdminPagesItem key={item._id} item={item} />
    ))}
  </div>
)

const mapStateToProps = ({ pages: { isFetching, items }}) => {
  return {
    isFetching,
    items
  }
}

export default connect(mapStateToProps)(AdminPagesList)
