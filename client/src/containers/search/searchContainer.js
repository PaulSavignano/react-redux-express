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
    pages: PropTypes.array,
  }
  return connect(
    ({
      pages: { isFetching, items },
      search
    }) => ({
      isFetching,
      pages: items,
      search
    })
  )(SearchContainer)
}

export default searchContainer
