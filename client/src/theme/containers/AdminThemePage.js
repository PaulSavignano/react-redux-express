import React from 'react'
import { connect } from 'react-redux'
import AdminThemeAdd from '../components/AdminThemeAdd'
import AdminTheme from '../components/AdminTheme'


const AdminThemePage = ({ theme }) => (
  <main>
    <section><h1>Theme Admin</h1></section>
    <AdminTheme />
  </main>
)

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(AdminThemePage)
