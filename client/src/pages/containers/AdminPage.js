import React from 'react'
import { connect } from 'react-redux'
import AdminPageNameAdd from '../components/AdminPageNameAdd'
import AdminPageNameList from '../components/AdminPageNameList'


const AdminPage = ({ pages }) => (
  <main>
    <AdminPageNameAdd />
    <AdminPageNameList pages={pages} />
  </main>
)

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(AdminPage)
