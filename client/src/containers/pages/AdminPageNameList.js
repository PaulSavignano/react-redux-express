import React from 'react'
import { connect } from 'react-redux'

import AdminPageName from './AdminPageName'

const AdminPageNameList = ({ isFetching, items }) => (
  !isFetching &&
  <div>
    {items.map(item => (
      <AdminPageName key={item._id} item={item} />
    ))}
  </div>
)

const mapStateToProps = ({ pages: { isFetching, items }}) => {
  return {
    isFetching,
    items
  }
}

export default connect(mapStateToProps)(AdminPageNameList)
