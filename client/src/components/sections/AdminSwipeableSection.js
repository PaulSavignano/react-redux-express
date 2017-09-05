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
        <AutoPlaySwipeableViews
          autoplay={true}
          slideStyle={propsForChild.style}
          interval={4000}
          animateTransitions={true}
          springConfig={{
            duration: '4s',
            easeFunction: 'ease-in-out',
            delay: '-1s'
          }}
          className="heroCarousel"
        >
          {renderAdminComponents({ components: items, pageSlug })}
        </AutoPlaySwipeableViews>

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

AdminSwipeableSection.propTypes = {
  autoplay: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
}

export default swipeableContainer(AdminSwipeableSection)
