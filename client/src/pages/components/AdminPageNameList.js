import React from 'react'
import { connect } from 'react-redux'
import AdminPageNameAdd from './AdminPageNameAdd'
import AdminPageName from './AdminPageName'


const AdminPageNameList = (props) => (
  props.pages.items ?
    <section>
      {props.pages.items.map(page => (
        <AdminPageName key={page._id} {...page} />
      ))}
    </section>
  :
    null
)

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(AdminPageNameList)
