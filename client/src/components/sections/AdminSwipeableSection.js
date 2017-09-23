import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'

import './section.css'
import swipeableContainer from '../../containers/sections/swipeableContainer'
import AdminSectionButtons from './AdminSectionButtons'
import renderAdminComponents from './renderAdminComponents'
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
      item,
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
          <AutoPlaySwipeableViews
            autoplay={autoplay}
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
            {renderAdminComponents({ components: item.items, pageSlug })}
          </AutoPlaySwipeableViews>
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

AdminSwipeableSection.propTypes = {
  autoplay: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
}

export default swipeableContainer(AdminSwipeableSection)
