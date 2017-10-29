import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'

import './section.css'
import sectionContainer from '../../containers/sections/sectionContainer'
import AdminComponentSwitch from './AdminComponentSwitch'
import AdminSectionEditButtons from './AdminSectionEditButtons'
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
      propsForChild,
      propsForParent,
    } = this.props
    return (
      <div {...propsForParent}>
        <section
          onTouchTap={this.handleStartEdit}
          {...propsForChild}
          className="AdminSectionSwipeable"
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
            {item.items.map(component => (
              <AdminComponentSwitch
                component={component}
                key={component.item._id}
                pageSlug={pageSlug}
              />
            ))}
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
  propsForChild: PropTypes.object.isRequired,
  propsForParent: PropTypes.object.isRequired,
}

export default sectionContainer(AdminSectionSwipeable)
