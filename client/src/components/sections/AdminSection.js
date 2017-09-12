import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

import './sections.css'
import sectionContainer from '../../containers/sections/sectionContainer'
import AdminSectionAdd from './AdminSectionAdd'
import renderAdminComponents from './renderAdminComponents'
import { startEdit } from '../../actions/editItem'

class AdminSection extends Component {
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit({ item, kind: 'SECTION' }))
  }
  render() {
    const {
      dispatch,
      item: {
        _id,
        items
      },
      pageId,
      pageSlug,
      propsForParent,
      propsForChild,
    } = this.props
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
        <div style={{ display: 'flex', position: 'absolute', bottom: 8, right: 8 }}>
          <AdminSectionAdd
            dispatch={dispatch}
            pageId={pageId}
            pageSlug={pageSlug}
            sectionId={_id}
          />
          <RaisedButton
            label="Edit Section"
            onTouchTap={this.handleStartEdit}
            className="edit-section"
          />
        </div>
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
