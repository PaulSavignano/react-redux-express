import React from 'react'
import { connect } from 'react-redux'

import AdminPageNameAdd from '../components/AdminPageNameAdd'
import AdminPageNameList from '../components/AdminPageNameList'

const AdminPage = ({ items, isFetching }) => (
  !isFetching &&
  <section>
    <AdminPageNameAdd />
    <AdminPageNameList items={items} />
  </section>
)

const mapStateToProps = ({ pages: { items, isFetching } }) => ({
  isFetching,
  items
})

export default connect(mapStateToProps)(AdminPage)
