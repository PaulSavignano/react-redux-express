import React from 'react'
import { connect } from 'react-redux'

import AdminPageNameAdd from '../components/AdminPageNameAdd'
import AdminPageNameList from '../components/AdminPageNameList'

const AdminPage = ({ items }) => (
  <div>
    <AdminPageNameAdd />
    <AdminPageNameList items={items} />
  </div>
)

const mapStateToProps = (state) => ({
  isFetching: state.pages.isFetching,
  items: state.pages.items
})

export default connect(mapStateToProps)(AdminPage)
