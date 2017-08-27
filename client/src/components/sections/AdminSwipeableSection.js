import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import RaisedButton from 'material-ui/RaisedButton'

import swipeableContainer from '../../containers/sections/swipeableContainer'
import AdminSectionAdd from './AdminSectionAdd'
import renderAdminComponents from './renderAdminComponents'
import { fetchUpdate, fetchDelete } from '../../actions/sections'
import { startEdit } from '../../actions/editItem'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

class AdminSwipeableSection extends Component {
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit({ item, kind: 'SECTION' }))
  }
  render() {
    const {
      autoplay,
      dispatch,
      item: { items, kind, values },
      pageId,
      pageSlug,
    } = this.props
    const backgroundColor = values && values.backgroundColor
    const pageLink = values && values.pageLink
    return (
      <section
        onTouchTap={this.handleStartEdit}
        className="swipeable-section"
        style={{ width: '100%', overflow: 'hidden', position: 'relative', minHeight: 60 }}
      >
        <AutoPlaySwipeableViews
          autoplay={autoplay}
        >
          {renderAdminComponents({ components: items, kind, pageSlug })}
        </AutoPlaySwipeableViews>
        <div style={{ display: 'flex', position: 'absolute', bottom: 8, right: 8 }}>
          <AdminSectionAdd
            dispatch={dispatch}
            pageId={pageId}
            pageSlug={pageSlug}
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

AdminSwipeableSection.propTypes = {
  autoplay: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
}

export default swipeableContainer(AdminSwipeableSection)
