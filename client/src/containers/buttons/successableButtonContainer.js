import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const successableButtonContainer = (ComposedComponent) => {
  class SuccessableButtonContainer extends Component {
    render() {
      const {
        isFetching,
      } = this.props
      return (
        isFetching ? null : <ComposedComponent {...this.props} />
      )
    }
  }
  SuccessableButtonContainer.propTypes = {
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    fontFamily: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
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
