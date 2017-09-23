import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './section.css'
import sectionContainer from '../../containers/sections/sectionContainer'
import AdminSectionButtons from './AdminSectionButtons'
import renderAdminComponents from './renderAdminComponents'

class AdminSection extends Component {
  render() {
    const {
      dispatch,
      item,
      pageId,
      pageSlug,
      propsForParent,
      propsForChild,
    } = this.props
    const { items } = item
    return (
      <div className="admin-section">
        <section
          onTouchTap={this.handleStartEdit}
          {...propsForParent}
        >
          <div {...propsForChild}>
            {renderAdminComponents({ components: items, pageSlug })}
          </div>
        </section>
        <AdminSectionButtons
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
  pageSlug: PropTypes.string.isRequired
}

export default sectionContainer(AdminSection)
