import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

const headerContainer = (ComposedComponent) => {
  class HeaderContainer extends Component {
    render() {
      const {
        appBar,
        cartQty,
        dispatch,
        drawer,
        firstName,
        fontFamily,
        isAdmin,
        isOwner,
        isFetching,
        name,
        pages,
        phone,
        primary1Color,
        searchOpen
      } = this.props
      const props = {
        appBar,
        cartQty,
        dispatch,
        drawer,
        firstName,
        fontFamily,
        isAdmin,
        isOwner,
        name,
        pages,
        phone,
        primary1Color,
        searchOpen
      }
      return (
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    brand: {
      appBar,
      business: { values: { phone }},
      isFetching: brandIsFetching,
      palette: { values: { primary1Color }},
      typography: { values: { fontFamily }},
    },
    carts: { cart: { quantity: cartQty }},
    drawer,
    pages: { isFetching: pagesIsFetching, items: pages },
    search: { open: searchOpen },
    user: { isFetching: userIsFetching, roles, values: { firstName }},
  }) => ({
    appBar,
    cartQty,
    drawer,
    firstName,
    fontFamily,
    isAdmin: roles.some(role => role === 'admin') ? true : false,
    isOwner: roles.some(role => role === 'owner') ? true : false,
    isFetching: brandIsFetching || pagesIsFetching || userIsFetching ? true : false,
    pages,
    phone,
    primary1Color,
    searchOpen
  })
  HeaderContainer.propTypes = {
    appBar: PropTypes.object.isRequired,
    cartQty: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    drawer: PropTypes.object.isRequired,
    firstName: PropTypes.string,
    fontFamily: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool,
    isOwner: PropTypes.bool,
    isFetching: PropTypes.bool.isRequired,
    pages: PropTypes.array,
    phone: PropTypes.string,
    primary1Color: PropTypes.string,
    searchOpen: PropTypes.bool.isRequired
  }
  return withRouter(connect(mapStateToProps)(HeaderContainer))
}

export default headerContainer
