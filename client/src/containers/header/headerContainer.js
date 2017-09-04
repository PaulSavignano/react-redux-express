import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const headerContainer = (ComposedComponent) => {
  class HeaderContainer extends Component {
    render() {
      const {
        brand,
        cartQty,
        dispatch,
        drawer,
        firstName,
        isAdmin,
        isOwner,
        isFetching,
        name,
        pages,
        pathname,
        search
      } = this.props
      const props = {
        brand,
        cartQty,
        dispatch,
        drawer,
        firstName,
        isAdmin,
        isOwner,
        name,
        pages,
        pathname,
        search
      }
      return (
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    brand,
    carts: { cart: { quantity }},
    drawer,
    pages,
    routing: { locationBeforeTransitions: { pathname }},
    search,
    user,
  }) => ({
    brand,
    cartQty: quantity,
    drawer,
    firstName: user.values.firstName,
    isAdmin: user.roles.some(role => role === 'admin') ? true : false,
    isOwner: user.roles.some(role => role === 'owner') ? true : false,
    isFetching: brand.isFetching || pages.isFetching ? true : false,
    name: brand.business.name,
    pages: pages.items,
    pathname,
    search
  })
  HeaderContainer.propTypes = {
    brand: PropTypes.object.isRequired,
    cartQty: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    drawer: PropTypes.object.isRequired,
    firstName: PropTypes.string,
    isAdmin: PropTypes.bool,
    isOwner: PropTypes.bool,
    isFetching: PropTypes.bool.isRequired,
    name: PropTypes.string,
    pages: PropTypes.array,
    pathname: PropTypes.string,
    search: PropTypes.object
  }
  return connect(mapStateToProps)(HeaderContainer)
}

export default headerContainer
