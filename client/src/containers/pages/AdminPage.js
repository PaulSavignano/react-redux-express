import React from 'react'
import { connect } from 'react-redux'

import AdminPageNameAdd from '../../components/pages/AdminPageNameAdd'
import AdminPageNameList from '../../components/pages/AdminPageNameList'

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
