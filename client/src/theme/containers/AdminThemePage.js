import React from 'react'
import { connect } from 'react-redux'
import AdminTheme from '../components/AdminTheme'
import AdminFavicon from '../components/AdminFavicon'

import { fetchAdd } from '../actions/index'

const AdminThemePage = ({ dispatch, isFetching, item }) => {
  !item.values && dispatch(fetchAdd())
  return (
    isFetching ? null : !item.values ? null :
    <main>
      <section><h1>Theme Admin</h1></section>
      <AdminFavicon item={item} />
      <AdminTheme item={item} />
    </main>

  )
}

const mapStateToProps = (state) => {
  const isFetching = state.theme.isFetching
  const item = state.theme || {}
  return {
    isFetching,
    item
  }
}

export default connect(mapStateToProps)(AdminThemePage)