import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const typographyContainer = (ComposedComponent) => {
  const TypographyContainer = ({
    dispatch,
    isFetching,
    typography
  }) => {
    const props = {
      dispatch,
      typography
    }
    return (
      isFetching ? null : <ComposedComponent {...props} />
    )
  }
  const mapStateToProps = ({
    brand: { isFetching, typography }
  }) => ({
    isFetching,
    typography
  })
  TypographyContainer.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    typography: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(TypographyContainer)
}

export default typographyContainer
