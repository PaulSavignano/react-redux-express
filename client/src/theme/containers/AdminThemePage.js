import React from 'react'
import { connect } from 'react-redux'
import AdminThemeAdd from '../components/AdminThemeAdd'
import AdminTheme from '../components/AdminTheme'
import AdminFavicon from '../components/AdminFavicon'


const AdminThemePage = ({ isFetching, item }) => (
  <main>
    <section><h1>Theme Admin</h1></section>
    {item ? null : <AdminThemeAdd />}
    <AdminFavicon item={item} />
    <AdminTheme item={item} />
  </main>
)

const mapStateToProps = (state) => {
  const isFetching = state.theme.isFetching
  const item = isFetching ? {} : state.theme
  return {
    isFetching,
    item
  }
}

export default connect(mapStateToProps)(AdminThemePage)
