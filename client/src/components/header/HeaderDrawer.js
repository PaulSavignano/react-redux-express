import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { ListItem } from 'material-ui/List'

import HeaderBrand from './HeaderBrand'
import HeaderDrawerPageLink from './HeaderDrawerPageLink'
import { toggleDrawer } from '../../actions/drawer'
import SigninSignout from '../../containers/users/SigninSignout'

const HeaderDrawer = ({
  brand: { appBar },
  dispatch,
  drawer,
  firstName,
  hasProducts,
  isAdmin,
  name,
  pages,
  sections
}) => {
  const { backgroundColor } = appBar.values
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
        <HeaderBrand item={appBar} />
      </Paper>
      {firstName && <div style={{ padding: 16, marginTop: 8 }}>Hello, {firstName}</div>}
      {pages.filter(page => page.slug !== 'home').map(page => (
        <HeaderDrawerPageLink
          dispatch={dispatch}
          key={page._id}
          page={page}
          sections={sections}
          handleTouchTap={handleTouchTap}
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

export default HeaderDrawer
