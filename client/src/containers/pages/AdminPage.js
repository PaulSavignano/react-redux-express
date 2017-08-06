import React, { Component } from 'react'

import pageContainer from './pageContainer'
import AdminSectionList from '../sections/AdminSectionList'
import AdminSectionAdd from '../sections/AdminSectionAdd'

class AdminPage extends Component {
  componentWillMount() {
    window.scrollTo(0,0)
  }
  render() {
    const { page, sections } = this.props
    return (
      <div style={{ minHeight: '80vh'}}>
        <AdminSectionList page={page} items={sections} />
        <AdminSectionAdd page={page} />
      </div>
    )
  }
}


export default pageContainer(AdminPage)
