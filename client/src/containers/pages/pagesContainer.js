import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const pagesContainer = (ComposedComponent) => {
  class PagesContainer extends Component {
    render() {
      const {
        dispatch,
        isFetching,
        pages
      } = this.props
      const props = {
        dispatch,
        pages
      }
      return (
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    pages: { items, isFetching }
  }) => ({
    isFetching,
    pages: items
  })
  PagesContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    pages: PropTypes.array.isRequired
  }
  return connect(mapStateToProps)(PagesContainer)
}

export default pagesContainer
