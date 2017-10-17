import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { ListItem } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'

import DrawerPageLink from './DrawerPageLink'
import DrawerAdminPageLink from './DrawerAdminPageLink'
import UserButtons from './UserButtons'
import CartIcon from './CartIcon'
import { toggleDrawer } from '../../actions/drawer'
import { searchToggle } from '../../actions/search'

class DrawerNavigation extends Component {
  handleCloseDrawer = () => this.props.dispatch(toggleDrawer())
  handleSearchToggle = () => {
    const { dispatch, searchOpen } = this.props
    dispatch(toggleDrawer())
    return dispatch(searchToggle(!searchOpen))
  }
  render() {
    const {
      cartQty,
      color,
      dispatch,
      firstName,
      isAdmin,
      isOwner,
      history,
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
              onTouchTap={this.handleCloseDrawer}
              containerElement={<Link to="/admin/brand"/>}
            />,
            <ListItem
              key={2}
              primaryText="Orders"
              onTouchTap={this.handleCloseDrawer}
              containerElement={<Link to="/admin/orders"/>}
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
                  onTouchTap={this.handleCloseDrawer}
                  containerElement={<Link to="/admin/pages"/>}
                />
              ]}
            />,
            isOwner ?
              <ListItem
                key={4}
                primaryText="Users"
                onTouchTap={this.handleCloseDrawer}
                containerElement={<Link to="/admin/users"/>}
              />
            : null
          ]}
        />
        }
        <UserButtons
          dispatch={dispatch}
          firstName={firstName}
          history={history}
          onSelect={this.handleCloseDrawer}
        />
        {cartQty &&
          <ListItem
            key={5}
            onTouchTap={this.handleCloseDrawer}
            style={{ height: 48}}
            children={
              <CartIcon
                key={1}
                cartQty={cartQty}
                dispatch={dispatch}
                color={null}
                style={{ margin: 0, padding: 0, width: 40 }}
                badgeStyle={{ top: -9, left: 9 }}
              />
            }
          />
        }
        <ListItem
          key={6}
          className="ListItem"
          onTouchTap={this.handleSearchToggle}
          style={{ height: 48 }}
          innerDivStyle={{ padding: 0 }}
          children={
            <IconButton
              key={1}
              iconClassName="fa fa-search"
              iconStyle={{ verticalAlign: 'middle', fontSize: 16 }}
            />
          }
        />

      </div>
    )
  }
}

DrawerNavigation.propTypes = {
  cartQty: PropTypes.number,
  color: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  history: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
  pages: PropTypes.array
}

export default withRouter(DrawerNavigation)
