import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import MenuItem from 'material-ui/MenuItem'
import { ListItem } from 'material-ui/List'

import SigninSignout from '../../users/components/SigninSignout'

const DrawerNav = ({ dispatch, theme, pages, user, handleClose }) => {
  const isAdmin = user.roles ? user.roles.find(role => role === 'admin') : null
  return (
    <div>
      <div style={{ cursor: 'pointer', padding: '0 16px' }} onTouchTap={() => dispatch(push('/'))}>
        {theme.image ? <img src={theme.image} style={{ maxHeight: 80 }} alt=""/> : 'Brand'}
      </div>
      {user.values.firstName && <div style={{ padding: 16, minHeight: 48 }}>Hello, {user.values.firstName}</div>}

      {pages.filter(page => page.slug !== 'home').map(page => (
        <MenuItem key={page._id} onTouchTap={() => {
          dispatch(push(`/pages/${page.slug}`))
          handleClose()
        }}>{page.name}</MenuItem>
      ))}

      <MenuItem onTouchTap={() => {
        dispatch(push('/products'))
        handleClose()
      }}>Products</MenuItem>

      <MenuItem onTouchTap={() => {
        dispatch(push('/contact'))
        handleClose()
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
                handleClose()
              }}
            />,
            <ListItem
              key={2}
              primaryText="Pages"
              onTouchTap={() => {
                dispatch(push(`/admin/pages`))
                handleClose()
              }}
            />,
            <ListItem
              key={3}
              primaryText="Products"
              onTouchTap={() => {
                dispatch(push(`/admin/products`))
                handleClose()
              }}
            />
          ]}
        />
      }
      <SigninSignout user={user}/>
    </div>

  )
}



export default connect()(DrawerNav)
