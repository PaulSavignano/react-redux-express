import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

import AdminSectionAdd from './AdminSectionAdd'
import { fetchUpdate, fetchDelete } from '../../actions/sections'
import { fetchAdd } from '../../actions/cards'
import { startEdit } from '../../actions/editItem'

import sectionContainer from '../../containers/sections/sectionContainer'
import renderAdminComponents from './renderAdminComponents'

class AdminSection extends Component {
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit({ item, kind: 'SECTION' }))
  }
  render() {
    const {
      dispatch,
      pageId,
      pageSlug,
      item: {
        _id,
        items,
        image,
        kind,
        values
      }
    } = this.props
    const backgroundColor = values && values.backgroundColor
    const pageLink = values && values.pageLink
    const backgroundImage = image && image.src && { backgroundImage: `url(${image.src})`,   transition: 'all 600ms ease-in-out' }
    const backgroundImageClass = image && image.src && { className: 'background-image' }
    return (
      <section
        id={pageLink}
        onTouchTap={this.handleStartEdit}
        style={{
          ...backgroundImage,
          backgroundColor,
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          minHeight: 70,
          display: 'flex'
        }}
        {...backgroundImageClass}
        className="admin-section"
      >
        {renderAdminComponents({ components: items, pageSlug })}
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
  item: PropTypes.object.isRequired
}

export default sectionContainer(AdminSection)
