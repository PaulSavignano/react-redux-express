import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import {List, ListItem} from 'material-ui/List'

const DrawerNav = ({ user, handleDrawer, items, open, handleSearch, dispatch }) => {
  const isUser = user.roles ? user.roles.find(role => role === 'user') : null
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
              primaryText="Pages"
              onTouchTap={() => {
                dispatch(push(`/admin/pages`))
                handleDrawer()
              }}
            />,
            <ListItem
              key={2}
              primaryText="Products"
              onTouchTap={() => {
                dispatch(push(`/admin/products`))
                handleDrawer()
              }}
            />
          ]}
        />
      }
      {isUser ?
        <MenuItem onTouchTap={() => {
          dispatch(push('/signout'))
          handleDrawer()
        }}>Signout</MenuItem>
        :
        <MenuItem onTouchTap={() => {
          dispatch(push('/signin'))
          handleDrawer()
        }}>Signin</MenuItem>
        }

    </Drawer>
  )
}



export default connect()(DrawerNav)
