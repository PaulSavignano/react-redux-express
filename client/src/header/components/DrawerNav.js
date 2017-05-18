import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { ListItem } from 'material-ui/List'

import SigninSignout from '../../users/components/SigninSignout'

const DrawerNav = ({ user, handleDrawer, items, open, handleSearch, dispatch }) => {
  const isAdmin = user.roles ? user.roles.find(role => role === 'admin') : null
  return (
    <Drawer
      docked={false}
      open={open}
      onRequestChange={handleDrawer}
    >
      {items.filter(item => item.slug !== 'home').map(item => (
        <MenuItem key={item._id} onTouchTap={() => {
          dispatch(push(`/${item.slug}`))
          handleDrawer()
        }}>{item.name}</MenuItem>
      ))}

      <MenuItem onTouchTap={() => {
        dispatch(push('/products'))
        handleDrawer()
      }}>Products</MenuItem>

      <MenuItem onTouchTap={() => {
        dispatch(push('/contact'))
        handleDrawer()
      }}>Contact</MenuItem>

      {!isAdmin ? null :
        <ListItem
          primaryText="Admin"
          initiallyOpen={false}
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Theme"
              onTouchTap={() => {
                dispatch(push(`/admin/theme`))
                handleDrawer()
              }}
            />,
            <ListItem
              key={2}
              primaryText="Pages"
              onTouchTap={() => {
                dispatch(push(`/admin/pages`))
                handleDrawer()
              }}
            />,
            <ListItem
              key={3}
              primaryText="Products"
              onTouchTap={() => {
                dispatch(push(`/admin/products`))
                handleDrawer()
              }}
            />
          ]}
        />
      }
      <SigninSignout user={user} handleChange={handleDrawer}/>

    </Drawer>
  )
}



export default connect()(DrawerNav)
