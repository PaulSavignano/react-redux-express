import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const appContainer = (ComposedComponent) => {
  class AppContainer extends Component {
    render() {
      const {
        isFetching,
      } = this.props
      return (
        isFetching ? null : <ComposedComponent {...this.props} />
      )
    }
  }
  const mapStateToProps = ({
    brand,
    pages,
    search
  }) => ({
    brand,
    isFetching: brand.isFetching || pages.isFetching ? true : false,
    pages: pages.items,
    search,
  })
  AppContainer.propTypes = {
    brand: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    pages: PropTypes.array,
    search: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(AppContainer)
}

export default appContainer
