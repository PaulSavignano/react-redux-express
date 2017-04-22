import React from 'react'
import { connect } from 'react-redux'
import AdminPageNameAdd from './AdminPageNameAdd'
import AdminPageName from './AdminPageName'


const AdminPageNameList = (props) => (
  <section>
    <AdminPageNameAdd />
    {props.pages.items ?
      props.pages.items.map(page => (
        <AdminPageName key={page._id} {...page} />
      ))
      :
    null}
  </section>
)

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(AdminPageNameList)
