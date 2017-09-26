import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'

import './section.css'
import sectionContainer from '../../containers/sections/sectionContainer'
import AdminSectionEditButtons from './AdminSectionEditButtons'
import renderAdminComponents from './renderAdminComponents'
import { startEdit } from '../../actions/editItem'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

class AdminSectionSwipeable extends Component {
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit({ item, kind: 'SECTION' }))
  }
  render() {
    const {
      autoplay,
      dispatch,
      item,
      pageId,
      pageSlug,
      style,
    } = this.props
    return (
      <div className="AdminSectionSwipeable">
        <section
          onTouchTap={this.handleStartEdit}
          style={style}
        >
          <AutoPlaySwipeableViews
            autoplay={autoplay}
            interval={4000}
            animateTransitions={true}
            springConfig={{
              duration: '4s',
              easeFunction: 'ease-in-out',
              delay: '-1s'
            }}
            className="AutoPlaySwipeableViews"
          >
            {renderAdminComponents({ components: item.items, pageSlug })}
          </AutoPlaySwipeableViews>
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

AdminSectionSwipeable.propTypes = {
  autoplay: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired,
  pageSlug: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
}

export default sectionContainer(AdminSectionSwipeable)
