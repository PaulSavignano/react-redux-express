import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import MenuItem from 'material-ui/MenuItem'
import { ListItem } from 'material-ui/List'
import { spacing, typography } from 'material-ui/styles'

import AppBarBrand from './AppBarBrand'
import * as brandActions from '../../brand/actions'
import * as pageActions from '../../pages/actions'
import SigninSignout from '../../users/components/SigninSignout'

const DrawerMenu = ({ dispatch, brand: { appBar, business, theme }, pages, user, handleClose, hasProducts }) => {
  const isAdmin = user.roles.find(role => role === 'admin') ? true : false
  const color = appBar.textColor || null
  const backgroundColor = appBar.color || null
  const styles = {
    logo: {
      cursor: 'pointer',
      fontSize: 24,
      color,
      backgroundColor,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      paddingLeft: spacing.desktopGutter,
      marginBottom: 8,
    }
  }
  const adminPages = pages.map(page => (
    <ListItem
      key={page._id}
      primaryText={page.name}
      onTouchTap={() => {
        dispatch(push(`/admin/pages/${page.slug}`))
        handleClose()
      }}
    />
  ))
  const adminPagesAndAdd = [
    ...adminPages,
    <ListItem
      key={1}
      primaryText="Add Page"
      onTouchTap={() => {
        dispatch(push(`/admin/pages`))
        handleClose()
      }}
    />
  ]
  return (
    <div>
      <div
        style={{ cursor: 'pointer', width: '100%', margin: '0 auto', maxHeight: 64 }}
        onTouchTap={() => {
          dispatch(push('/'))
          handleClose()
        }}
      >

        <div style={styles.logo}>
          <AppBarBrand />
        </div>
      </div>
      {user.values.firstName && <div style={{ padding: 16, minHeight: 48 }}>Hello, {user.values.firstName}</div>}

      {pages.filter(page => page.slug !== 'home').map(page => (
        <MenuItem key={page._id} onTouchTap={() => {
          dispatch(push(`/${page.slug}`))
          handleClose()
        }}>{page.name}</MenuItem>
      ))}

      <MenuItem onTouchTap={() => {
        dispatch(push('/contact'))
        handleClose()
      }}>Contact</MenuItem>

      {!isAdmin ? null : !business.name ?
        <MenuItem onTouchTap={() => {
          dispatch(pageActions.fetchAdd({ name: 'Home'}))
          dispatch(brandActions.fetchAdd())
          .then(()=> dispatch(push(`/admin/brand`)))
          handleClose()
        }}>Add Brand</MenuItem>
      :
      <ListItem
        primaryText="Admin"
        initiallyOpen={false}
        primaryTogglesNestedList={true}
        nestedItems={[
          <ListItem
            key={1}
            primaryText="Brand"
            onTouchTap={() => {
              dispatch(push(`/admin/brand`))
              handleClose()
            }}
          />,
          <ListItem
            key={2}
            primaryText="Pages"
            onTouchTap={() => console.log('tapped')}
            initiallyOpen={true}
            primaryTogglesNestedList={true}
            nestedItems={adminPagesAndAdd}
          />,
          <ListItem
            key={3}
            primaryText="Orders"
            onTouchTap={() => {
              dispatch(push(`/admin/orders`))
              handleClose()
            }}
          />
        ]}
      />
      }
      <SigninSignout user={user} handleClose={handleClose} />
    </div>
  )
}



export default connect()(DrawerMenu)
