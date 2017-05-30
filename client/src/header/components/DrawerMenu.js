import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import MenuItem from 'material-ui/MenuItem'
import { List, ListItem } from 'material-ui/List'
import {spacing, typography, zIndex} from 'material-ui/styles'

import { fetchAdd } from '../../brand/actions/index'
import SigninSignout from '../../users/components/SigninSignout'



const DrawerMenu = ({ dispatch, brand, pages, user, handleClose, hasProducts }) => {
  const isAdmin = user.roles.find(role => role === 'admin') ? true : false
  const color = brand.values.appBar ? brand.values.appBar.textColor : null
  const backgroundColor = brand.values.appBar ? brand.values.appBar.color : null
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
        {brand.image ?
          <img src={brand.image} style={{ margin: '0 auto 8px auto', width: 'auto', height: 64 }} alt=""/>
          :
          <div style={styles.logo}>
            {brand.values.name ? brand.values.name : 'Brand'}
          </div>
        }
      </div>
      {user.values.firstName && <div style={{ padding: 16, minHeight: 48 }}>Hello, {user.values.firstName}</div>}

      {pages.filter(page => page.slug !== 'home').map(page => (
        <MenuItem key={page._id} onTouchTap={() => {
          dispatch(push(`/${page.slug}`))
          handleClose()
        }}>{page.name}</MenuItem>
      ))}

      {!hasProducts ? null :
        <MenuItem onTouchTap={() => {
          dispatch(push('/products'))
          handleClose()
        }}>Products</MenuItem>
      }

      <MenuItem onTouchTap={() => {
        dispatch(push('/contact'))
        handleClose()
      }}>Contact</MenuItem>

      {!isAdmin ? null : !brand.values.name ?
        <MenuItem onTouchTap={() => {
          dispatch(fetchAdd())
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
              initiallyOpen={true}
              primaryTogglesNestedList={true}
              nestedItems={adminPagesAndAdd}
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
      <SigninSignout user={user} handleClose={handleClose} />
    </div>
  )
}



export default connect()(DrawerMenu)
