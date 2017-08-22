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
  handleSignout = () => {
    const { dispatch } = this.props
    dispatch(toggleDrawer())
    dispatch(push('/user/signin'))
  }
  handleProfile = () => {
    const { dispatch } = this.props
    dispatch(toggleDrawer())
    dispatch(push('/user/profile'))
  }
  handleSignin = () => {
    const { dispatch } = this.props
    dispatch(toggleDrawer())
    dispatch(push('/user/profile'))
  }
  handleSignup = () => {
    const { dispatch } = this.props
    dispatch(toggleDrawer())
    dispatch(push('/user/signup'))
  }
  handleAdminPages = () => {
    const { dispatch } = this.props
    dispatch(toggleDrawer())
    dispatch(push(`/admin/pages`))
  }
  handleAdminOrders = () => {
    const { dispatch } = this.props
    dispatch(toggleDrawer())
    dispatch(push(`/admin/orders`))
  }
  handleAdminBrand = () => {
    const { dispatch } = this.props
    dispatch(toggleDrawer())
    dispatch(push(`/admin/brand`))
  }
  render() {
    const {
      cartQty,
      color,
      dispatch,
      firstName,
      isAdmin,
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
              onTouchTap={this.handleAdminBrand}
            />,
            <ListItem
              key={2}
              primaryText="Pages"
              initiallyOpen={true}
              primaryTogglesNestedList={true}
              nestedItems={[
                ...adminPages,
                <ListItem
                  key={1}
                  primaryText="Edit Pages"
                  onTouchTap={this.handleAdminPages}
                />
              ]}
            />,
            <ListItem
              key={3}
              primaryText="Orders"
              onTouchTap={this.handleAdminOrders}
            />
          ]}
        />
        }
        {firstName ?
          <div>
            <MenuItem primaryText="Sign out" onTouchTap={this.handleSignout}/>
            <MenuItem primaryText="Profile" onTouchTap={this.handleProfile}/>
          </div>
        :
        <div>
          <MenuItem primaryText="Sign in"
            onTouchTap={this.handleSignin}
          />
          <MenuItem primaryText="Sign up"
            onTouchTap={this.handleSignup}/>
        </div>
        }
        {cartQty &&
          <HeaderCartIcon
            cartQty={cartQty}
            dispatch={dispatch}
            color={color}
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
