import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const headerContainer = (ComposedComponent) => {
  class HeaderContainer extends Component {
    render() {
      const { isFetching } = this.props
      return (
        isFetching ? null : <ComposedComponent {...this.props} />
      )
    }
  }
  const mapStateToProps = ({
    brand,
    drawer,
    pages,
    products,
    routing: { locationBeforeTransitions: { pathname }},
    search,
    sections,
    user,
  }) => ({
    brand,
    drawer,
    firstName: user.values.firstName,
    hasProducts: products.items.length ? true : false,
    isAdmin: user.roles.find(role => role === 'admin') ? true : false,
    isFetching: brand.isFetching || pages.isFetching || products.isFetching || sections.isFetching ? true : false,
    name: brand.business.name,
    pages: pages.items,
    pathname,
    sections: sections.items,
    search
  })
  HeaderContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    brand: PropTypes.object.isRequired,
    hasProducts: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired
  }
  return connect(mapStateToProps)(HeaderContainer)
}

export default headerContainer
