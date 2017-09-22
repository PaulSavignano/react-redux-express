import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const searchContainer = (ComposedComponent) => {
  class SearchContainer extends Component {
    render() {
      const {
        dispatch,
        isFetching,
        pages,
        search
      } = this.props
      const props = {
        dispatch,
        pages,
        search
      }
      return (
        !isFetching ? <ComposedComponent {...props} /> : null
      )
    }
  }
  SearchContainer.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    pages: PropTypes.array,
    search: PropTypes.object.isRequired,
  }
  return connect(
    ({
      pages: { isFetching, items: pages },
      search
    }) => ({
      isFetching,
      pages,
      search
    })
  )(SearchContainer)
}

export default searchContainer
