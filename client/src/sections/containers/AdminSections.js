import React from 'react'
import { connect } from 'react-redux'

import AdminSectionAdd from '../components/AdminSectionAdd'
import AdminSectionList from '../components/AdminSectionList'

const AdminSections = ({ isFetching, page, items }) => {
  return (
    isFetching ? null :
    <div style={{ marginTop: 30 }}>
      <AdminSectionList page={page} items={items} />
      <br/><br/><br/>
      <AdminSectionAdd page={page} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.cards.isFetching,
  items: state.sections.items.filter(item => item.pageId === ownProps.page._id)
})

export default connect(mapStateToProps)(AdminSections)
