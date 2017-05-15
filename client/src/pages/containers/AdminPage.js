import React from 'react'
import { connect } from 'react-redux'

import AdminPageNameAdd from '../components/AdminPageNameAdd'
import AdminPageNameList from '../components/AdminPageNameList'

const AdminPage = ({ items }) => (
  <main>
    <AdminPageNameAdd />
    <AdminPageNameList items={items} />
  </main>
)

const mapStateToProps = (state) => ({
  isFetching: state.pages.isFetching,
  items: state.pages.items
})

export default connect(mapStateToProps)(AdminPage)
