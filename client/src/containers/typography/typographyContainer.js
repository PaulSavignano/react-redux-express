import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const typographyContainer = (ComposedComponent) => {
  class TypographyContainer extends Component {
    render() {
      const {
        children,
        color,
        dispatch,
        fontFamily,
        isFetching,
        margin,
        typography,
        textAlign,
        textColor,
        textShadow,
      } = this.props
      const props = {
        children,
        color,
        dispatch,
        fontFamily,
        margin,
        typography,
        textAlign,
        textColor,
        textShadow,
      }
      return (
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    brand: {
      isFetching,
      typography,
      palette: { values: { textColor }},
      typography: { values: { fontFamily }},
    }
  }) => ({
    fontFamily,
    isFetching,
    textColor,
    typography
  })
  TypographyContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    typography: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(TypographyContainer)
}

export default typographyContainer
