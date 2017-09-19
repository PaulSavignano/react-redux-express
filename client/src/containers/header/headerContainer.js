import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

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
    search: PropTypes.object
  }
  return withRouter(connect(mapStateToProps)(HeaderContainer))
}

export default headerContainer
