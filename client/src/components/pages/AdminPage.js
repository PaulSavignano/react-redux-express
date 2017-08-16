import React, { Component } from 'react'

import pageContainer from '../../containers/pages/pageContainer'
import AdminSection from '../sections/AdminSection'
import AdminSectionAdd from '../sections/AdminSectionAdd'

class AdminPage extends Component {
  componentWillMount() {
    window.scrollTo(0,0)
  }
  render() {
    const { dispatch, page, sections } = this.props
    return (
      <div style={{ minHeight: '80vh'}}>
        {sections.map(item => (
          <AdminSection
            dispatch={dispatch}
            key={item._id}
            item={item}
            page={page}
          />
        ))}
        <AdminSectionAdd
          dispatch={dispatch}
          page={page}
        />
      </div>
    )
  }
}

export default pageContainer(AdminPage)
