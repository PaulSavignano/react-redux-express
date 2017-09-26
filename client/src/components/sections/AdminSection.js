import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './section.css'
import sectionContainer from '../../containers/sections/sectionContainer'
import AdminSectionEditButtons from './AdminSectionEditButtons'
import renderAdminComponents from './renderAdminComponents'

class AdminSection extends Component {
  render() {
    const {
      dispatch,
      item,
      pageId,
      pageSlug,
      style
    } = this.props
    const { items } = item
    return (
      <div className="AdminSection">
        <section
          onTouchTap={this.handleStartEdit}
          style={style}
        >
          {renderAdminComponents({ components: items, pageSlug })}
        </section>
        <AdminSectionEditButtons
          dispatch={dispatch}
          item={item}
          pageId={pageId}
          pageSlug={pageSlug}
        />
      </div>
    )
  }
}

AdminSection.propTypes = {
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired,
  pageSlug: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired
}

export default sectionContainer(AdminSection)
