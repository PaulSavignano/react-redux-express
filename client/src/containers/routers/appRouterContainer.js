import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const appRouterContainer = (ComposedComponent) => {
  class AppRouterContainer extends Component {
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
  AppRouterContainer.propTypes = {
    brand: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    pages: PropTypes.array,
    search: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(AppRouterContainer)
}

export default appRouterContainer
