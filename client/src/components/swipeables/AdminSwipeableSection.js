import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import RaisedButton from 'material-ui/RaisedButton'

import AdminSwipeableView from './AdminSwipeableView'
import { fetchUpdate, fetchDelete } from '../../actions/swipeableSections'
import { fetchAdd } from '../../actions/swipeableViews'
import { startEdit } from '../../actions/editItem'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

class AdminSwipeableSection extends Component {
  handleAdd = (e) => {
    e.stopPropagation()
    const { dispatch, item: { _id }} = this.props
    return dispatch(fetchAdd({ sectionId: _id }))
  }
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit({ item, kind: 'SWIPEABLE_SECTION' }))
  }
  render() {
    const {
      autoplay,
      dispatch,
      item: { items, values },
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
          {items.map(item => (
            <AdminSwipeableView
              dispatch={dispatch}
              item={item}
              key={item._id}
            />
          ))}
        </AutoPlaySwipeableViews>
        <div style={{ display: 'flex', position: 'absolute', bottom: 8, right: 8 }}>
          <RaisedButton
            label="Add View"
            onTouchTap={this.handleAdd}
            style={{ margin: 8 }}
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

export default connect(({ swipeables: { autoplay }}) => ({ autoplay }))(AdminSwipeableSection)
