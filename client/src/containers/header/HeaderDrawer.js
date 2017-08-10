import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { ListItem } from 'material-ui/List'

import HeaderBrand from './HeaderBrand'
import { toggleDrawer } from '../../actions/drawer'
import * as brandActions from '../../actions/brand'
import SigninSignout from '../users/SigninSignout'

const HeaderDrawer = ({
  backgroundColor,
  dispatch,
  drawer,
  firstName,
  hasProducts,
  isAdmin,
  isFetching,
  name,
  pages
}) => {
  const handleTouchTap = (path) => {
    dispatch(push(path))
    dispatch(toggleDrawer())
  }
  const adminPages = pages.map(page => (
    <ListItem
      key={page._id}
      primaryText={page.name}
      onTouchTap={() => handleTouchTap(`/admin/pages/${page.slug}`)}
    />
  ))
  const adminPagesAndEdit = [
    ...adminPages,
    <ListItem
      key={1}
      primaryText="Edit Pages"
      onTouchTap={() => handleTouchTap(`/admin/pages`)}
    />
  ]
  return (
    <Drawer docked={false} open={drawer.open} onRequestChange={() => dispatch(toggleDrawer()) }>
      <Paper
        style={{ backgroundColor, fontSize: 24, height: 64, paddingLeft: 16, cursor: 'pointer', display: 'flex' }}
        onTouchTap={() => {
          dispatch(toggleDrawer())
          return dispatch(push('/'))
        }}
      >
        <HeaderBrand />
      </Paper>
      {firstName && <div style={{ padding: 16, marginTop: 8 }}>Hello, {firstName}</div>}
      {pages.filter(page => page.slug !== 'home').map(page => (
        <MenuItem key={page._id} onTouchTap={() => handleTouchTap(`/${page.slug}`)}>
          {page.name}
        </MenuItem>
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
            onTouchTap={() => handleTouchTap(`/admin/brand`)}
          />,
          <ListItem
            key={2}
            primaryText="Pages"
            initiallyOpen={true}
            primaryTogglesNestedList={true}
            nestedItems={adminPagesAndEdit}
          />,
          <ListItem
            key={3}
            primaryText="Orders"
            onTouchTap={() => handleTouchTap(`/admin/orders`)}
          />
        ]}
      />
      }
      <SigninSignout firstName={firstName} handleTouchTap={handleTouchTap} />
    </Drawer>
  )
}

const mapStateToProps = ({ brand, drawer, pages, products: { items }, user }) => {
  const { appBar: { values }, business: { name }} = brand
  const isFetching = !brand.isFetching && ! pages.isFetching && !user.isFetching ? false : true
  const isAdmin = user.roles.find(role => role === 'admin') ? true : false
  const backgroundColor = values ? values.backgroundColor : 'rgb(0, 188, 212)'
  return {
    backgroundColor,
    drawer,
    firstName: user.values.firstName,
    hasProducts: items.length ? true : false,
    isAdmin,
    isFetching,
    name,
    pages: pages.items,
  }
}

export default connect(mapStateToProps)(HeaderDrawer)
