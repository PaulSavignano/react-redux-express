import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const swipeableContainer = (ComposedComponent) => {
  class SwipeableContainer extends Component {
    render() {
      const {
        dispatch,
        isFetching,
        item,
        swipeableStyle
      } = this.props
      const props = {
        dispatch,
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
  }, {
    item
  }) => ({
    swipeableStyle,
    isFetching,
    item,
    typography
  })
  SwipeableContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    swipeableStyle: PropTypes.object.isRequired,
    typography: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(SwipeableContainer)
}

export default swipeableContainer
