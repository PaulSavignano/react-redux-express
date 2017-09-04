import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import MenuItem from 'material-ui/MenuItem'
import { ListItem } from 'material-ui/List'

import DrawerPageLink from './DrawerPageLink'
import DrawerAdminPageLink from './DrawerAdminPageLink'
import HeaderCartIcon from './HeaderCartIcon'
import { toggleDrawer } from '../../actions/drawer'

class DrawerNavigation extends Component {
  handleNavToAdminBrand = () => {
    const { dispatch } = this.props
    dispatch(toggleDrawer())
    dispatch(push(`/admin/brand`))
  }
  handleNavToAdminOrders = () => {
    const { dispatch } = this.props
    dispatch(toggleDrawer())
    dispatch(push(`/admin/orders`))
  }
  handleNavToAdminPages = () => {
    const { dispatch } = this.props
    dispatch(toggleDrawer())
    dispatch(push(`/admin/pages`))
  }
  handleNavToAdminUsers = () => {
    const { dispatch } = this.props
    dispatch(toggleDrawer())
    dispatch(push(`/admin/users`))
  }
  handleNavToProfile = () => {
    const { dispatch } = this.props
    dispatch(toggleDrawer())
    dispatch(push('/user/profile'))
  }
  handleNavToSignin = () => {
    const { dispatch } = this.props
    dispatch(toggleDrawer())
    dispatch(push('/user/profile'))
  }
  handleNavToSignout = () => {
    const { dispatch } = this.props
    dispatch(toggleDrawer())
    dispatch(push('/user/signin'))
  }
  handleNavToSignup = () => {
    const { dispatch } = this.props
    dispatch(toggleDrawer())
    dispatch(push('/user/signup'))
  }
  handleNavToCart = () => {
    const { dispatch } = this.props
    dispatch(toggleDrawer())
    dispatch(push('/user/cart'))
  }
  render() {
    const {
      cartQty,
      color,
      dispatch,
      firstName,
      isAdmin,
      isOwner,
      pages
    } = this.props
    const adminPages = pages.map(page => (
      <DrawerAdminPageLink
        dispatch={dispatch}
        key={page._id}
        page={page}
      />

    ))
    return (
      <div>
        {pages.filter(page => page.slug !== 'home').map(page => (
          <DrawerPageLink
            dispatch={dispatch}
            key={page._id}
            page={page}
          />
        ))}
        {!isAdmin ? null
        :
        <ListItem
          primaryText="Admin"
          initiallyOpen={false}
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Brand"
              onTouchTap={this.handleNavToAdminBrand}
            />,
            <ListItem
              key={2}
              primaryText="Orders"
              onTouchTap={this.handleNavToAdminOrders}
            />,
            <ListItem
              key={3}
              primaryText="Pages"
              initiallyOpen={true}
              primaryTogglesNestedList={true}
              nestedItems={[
                ...adminPages,
                <ListItem
                  key={1}
                  primaryText="Edit Pages"
                  onTouchTap={this.handleNavToAdminPages}
                />
              ]}
            />,
            isOwner ?
              <ListItem
                key={4}
                primaryText="Users"
                onTouchTap={this.handleNavToAdminUsers}
              />
            : null
          ]}
        />
        }
        {firstName ?
          <div>
            <MenuItem primaryText="Sign out" onTouchTap={this.handleNavToSignout}/>
            <MenuItem primaryText="Profile" onTouchTap={this.handleNavToProfile}/>
          </div>
        :
        <div>
          <MenuItem primaryText="Sign in"
            onTouchTap={this.handleNavToSignin}
          />
          <MenuItem primaryText="Sign up"
            onTouchTap={this.handleNavToSignup}/>
        </div>
        }
        {cartQty &&
          <HeaderCartIcon
            cartQty={cartQty}
            dispatch={dispatch}
            color={color}
            onNavToCart={this.handleNavToCart}
          />
        }
      </div>
    )
  }
}

DrawerNavigation.propTypes = {
  cartQty: PropTypes.number,
  color: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  isAdmin: PropTypes.bool,
  pages: PropTypes.array
}

export default DrawerNavigation
