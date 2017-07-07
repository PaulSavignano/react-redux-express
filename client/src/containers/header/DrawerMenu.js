import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import MenuItem from 'material-ui/MenuItem'
import { ListItem } from 'material-ui/List'

import AppBarBrand from './AppBarBrand'
import { toggleDrawer } from '../../actions/drawer'
import * as brandActions from '../../actions/brand'
import * as pageActions from '../../actions/pages'
import SigninSignout from '../users/SigninSignout'


const DrawerMenu = ({ dispatch, brand: { business, appBar }, pages, user, hasProducts }) => {
  const isAdmin = user.roles.find(role => role === 'admin') ? true : false
  const handleTouchTap = (path) => {
    dispatch(push(path))
    dispatch(toggleDrawer())
  }
  const backgroundColor = appBar.styles ? appBar.styles.backgroundColor : 'rgb(0, 188, 212)'
  const adminPages = pages.map(page => (
    <ListItem
      key={page._id}
      primaryText={page.name}
      onTouchTap={() => handleTouchTap(`/admin/pages/${page.slug}`)}
    />
  ))
  const adminPagesAndAdd = [
    ...adminPages,
    <ListItem
      key={1}
      primaryText="Edit Pages"
      onTouchTap={() => handleTouchTap(`/admin/pages`)}
    />
  ]
  return (
    <div>
      <div
        style={{ cursor: 'pointer', width: '100%', margin: '0 auto 8px', maxHeight: 64, backgroundColor, padding: 16, fontSize: 24, height: 64 }}
        onTouchTap={() => handleTouchTap('/')}
      >
        <AppBarBrand />
      </div>
      {user.values.firstName && <div style={{ padding: 16, minHeight: 48 }}>Hello, {user.values.firstName}</div>}

      {pages.filter(page => page.slug !== 'home').map(page => (
        <MenuItem
          key={page._id}
          onTouchTap={() => handleTouchTap(`/${page.slug}`)}
        >
          {page.name}
        </MenuItem>
      ))}

      <MenuItem
        onTouchTap={() => handleTouchTap('/contact')}
      >
        Contact
      </MenuItem>

      {!isAdmin ? null : !business.name ?
        <MenuItem onTouchTap={() => {
          dispatch(brandActions.fetchAdd())
          .then(() => handleTouchTap(`/admin/brand`))
        }}
        >
          Add Brand
        </MenuItem>
      :
      <ListItem
        primaryText="Admin"
        initiallyOpen={false}
        primaryTogglesNestedList={true}
        nestedItems={[
          <ListItem
            key={1}
            primaryText="Brand"
            onTouchTap={() => handleTouchTap(`/admin/brand`)}
          />,
          <ListItem
            key={2}
            primaryText="Pages"
            initiallyOpen={true}
            primaryTogglesNestedList={true}
            nestedItems={adminPagesAndAdd}
          />,
          <ListItem
            key={3}
            primaryText="Orders"
            onTouchTap={() => handleTouchTap(`/admin/orders`)}
          />
        ]}
      />
      }
      <SigninSignout user={user} handleTouchTap={handleTouchTap} />
    </div>
  )
}

const mapStateToProps = ({ brand, pages, products, routing, search, user }) => {
    console.log('inside DrawerMenu')
  return {
    brand: brand || null,
    hasProducts: products.items.length ? true : false,
    pages: pages.items || null,
    path: routing.locationBeforeTransitions.pathname || null,
    user: user || null,
    search
  }
}

export default connect(mapStateToProps)(DrawerMenu)
