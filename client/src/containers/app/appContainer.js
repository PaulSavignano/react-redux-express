import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const appContainer = (ComposedComponent) => {
  class AppContainer extends Component {
    render() {
      const {
        brand,
        isFetching,
        pathname,
        search
      } = this.props
      const props = {
        brand,
        pathname,
        search,
      }
      return (
        isFetching ? null : <ComposedComponent {...this.props} />
      )
    }
  }
  const mapStateToProps = ({
    brand,
    search
  }, {
    location: { pathname }
  }) => ({
    brand,
    isFetching: brand.isFetching,
    pathname,
    search,
  })
  AppContainer.propTypes = {
    brand: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(AppContainer)
}

export default appContainer
