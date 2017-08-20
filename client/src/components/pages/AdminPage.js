import React, { Component } from 'react'
import PropTypes from 'prop-types'

import pageContainer from '../../containers/pages/pageContainer'
import AdminSection from '../sections/AdminSection'
import AdminSectionAdd from '../sections/AdminSectionAdd'

class AdminPage extends Component {
  componentWillMount() {
    window.scrollTo(0,0)
  }
  render() {
    const { dispatch, page } = this.props
    const { sections } = page
    return (
      <div style={{ minHeight: '80vh'}}>
        {sections.map(section => (
          <AdminSection
            key={section.sectionId}
            sectionId={section.sectionId}
            pageSlug={page.slug}
          />
        ))}
        <AdminSectionAdd
          dispatch={dispatch}
          pageId={page._id}
          pageSlug={page.slug}
        />
      </div>
    )
  }
}

export default pageContainer(AdminPage)
