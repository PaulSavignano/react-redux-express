import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const imagesContainer = (ComposedComponent) => {
  class ImagesContainer extends Component {
    render() {
      const {
        isFetching,
      } = this.props
      return (
        isFetching ? null : <ComposedComponent {...this.props} />
      )
    }
  }
  const mapStateToProps = ({ pages: { isFetching, items }}) => ({
    pages: items,
    isFetching
  })
  ImagesContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    pages: PropTypes.array.isRequired,
  }
  return connect(mapStateToProps)(ImagesContainer)
}

export default imagesContainer
