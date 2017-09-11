import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const successableButtonContainer = (ComposedComponent) => {
  class SuccessableButtonContainer extends Component {
    render() {
      const {
        backgroundColor,
        color,
        destroy,
        dispatch,
        error,
        fontFamily,
        isFetching,
        label,
        style,
        submitFailed,
        submitSucceeded,
        submitting,
        successLabel,
        valid
      } = this.props
      const props = {
        backgroundColor,
        color,
        destroy,
        dispatch,
        error,
        fontFamily,
        label,
        style,
        submitFailed,
        submitSucceeded,
        submitting,
        successLabel,
        valid
      }
      return (
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
  SuccessableButtonContainer.propTypes = {
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    destroy: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string,
    fontFamily: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    style: PropTypes.object,
    submitFailed: PropTypes.bool.isRequired,
    submitSucceeded: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    successLabel: PropTypes.string.isRequired,
    valid: PropTypes.bool.isRequired,
  }
  return connect(
    ({
      brand: {
        isFetching,
        theme: { values: { fontFamily }},
        palette: { values: { canvasColor, primary1Color }}
      }
    }) => ({
      backgroundColor: primary1Color,
      color: canvasColor,
      fontFamily,
      isFetching
    })
  )(SuccessableButtonContainer)
}

export default successableButtonContainer
