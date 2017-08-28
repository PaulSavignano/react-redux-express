import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

import sectionContainer from '../../containers/sections/sectionContainer'
import AdminSectionAdd from './AdminSectionAdd'
import renderAdminComponents from './renderAdminComponents'
import { fetchUpdate, fetchDelete } from '../../actions/sections'
import { fetchAdd } from '../../actions/cards'
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
      <section
        onTouchTap={this.handleStartEdit}
        {...propsForParent}
      >
        <div {...propsForChild}>
          {renderAdminComponents({ components: items, pageSlug })}
        </div>
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
            style={{ margin: 8 }}
          />
        </div>
      </section>
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
