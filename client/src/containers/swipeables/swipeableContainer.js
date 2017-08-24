import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const swipeableContainer = (ComposedComponent) => {
  class SwipeableContainer extends Component {
    render() {
      const {
        dispatch,
        editItem,
        isFetching,
        item,
        swipeableStyle
      } = this.props
      const props = {
        dispatch,
        editItem,
        item,
        swipeableStyle
      }
      return (
        !isFetching && item ? <ComposedComponent {...props} /> : null
      )
    }
  }
  const mapStateToProps = ({
    brand: { isFetching, swipeableStyle, typography },
    editItem
  }, {
    item
  }) => ({
    swipeableStyle,
    editItem: editItem.kind === 'SWIPEABLE_SECTION' || editItem.kind === 'SWIPEABLE_VIEW' ? editItem : null,
    isFetching,
    item,
    typography
  })
  SwipeableContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    editItem: PropTypes.object,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    swipeableStyle: PropTypes.object.isRequired,
    typography: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(SwipeableContainer)
}

export default swipeableContainer
