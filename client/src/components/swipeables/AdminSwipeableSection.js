import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import RaisedButton from 'material-ui/RaisedButton'

import swipeableContainer from '../../containers/carousels/swipeableContainer'
import AdminItemForm from '../forms/AdminItemForm'
import { fetchUpdate, fetchDelete } from '../../actions/swipeableSections'
import { startEdit } from '../../actions/editItem'

import renderTextField from '../fields/renderTextField'

const fields = [
  { name: 'backgroundColor', type: 'text', component: renderTextField },
  { name: 'pageLink', type: 'text',  component: renderTextField }
]

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

class AdminSwipeableSection extends Component {
  handleEditCarousel = () => {
    const { dispatch, item } = this.props
    return dispatch(startEdit(item, 'SWIPEABLE_SECTION'))
  }
  render() {
    const {
      dispatch,
      editItem,
      item,
      swipeableStyle
    } = this.props
    return (
      <section>
        <AutoPlaySwipeableViews
          autoplay={editItem.autoplay}
        >
          {item.views.map(view => (
            <AdminSwipeableView
              dispatch={dispatch}
              editItem={editItem}
              item={item}
              key={slide._id}
              swipeableStyle={swipeableStyle}
            />
          ))}
        </AutoPlaySwipeableViews>
        <div className="button-container">
          <RaisedButton
            label="Edit Swipeable"
            primary={true}
            className="button"
            onTouchTap={this.handleEditCarousel}
          />
          <RaisedButton
            label="Add View"
            primary={true}
            className="button"
            onTouchTap={this.handleAddSlide}
          />
        </div>
        {editItem.editing && editItem.kind === 'SWIPEABLE_SECTION' ?
          <AdminItemForm
            form={`swipeableSection_${editItem.item._id}`}
            editItem={editItem}
            initialValues={editItem.item.values}
            fields={fields}
            dispatch={dispatch}
            fetchUpdate={fetchUpdate}
            fetchDelete={fetchDelete}
          />
        : null}
      </section>
    )
  }
}

AdminSwipeableSection.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editItem: PropTypes.object,
  item: PropTypes.object.isRequired,
  swipeableStyle: PropTypes.object.isRequired
}

export default swipeableContainer(AdminSwipeableSection)
