import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import MenuItem from 'material-ui/MenuItem'
import { ListItem } from 'material-ui/List'
import {spacing, typography, zIndex} from 'material-ui/styles'

import { fetchAdd } from '../../brand/actions/index'
import SigninSignout from '../../users/components/SigninSignout'

const DrawerNav = ({ dispatch, brand, pages, user, handleClose }) => {
  const isAdmin = user.roles ? user.roles.find(role => role === 'admin') : null
  const styles = {
    logo: {
      cursor: 'pointer',
      fontSize: 24,
      color: brand.values.appBar.textColor,
      backgroundColor: brand.values.appBar.color,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      paddingLeft: spacing.desktopGutter,
      marginBottom: 8,
    }
  }
  return (
    <div>
      <div
        style={{ cursor: 'pointer', width: '100%', margin: '0 auto' }}
        onTouchTap={() => {
          dispatch(push('/'))
          handleClose()
        }}
      >
        {brand.image ?
          <img src={brand.image} style={{ maxHeight: 80, margin: '0 auto 8px auto' }} alt=""/>
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

      <MenuItem onTouchTap={() => {
        dispatch(push('/products'))
        handleClose()
      }}>Products</MenuItem>

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
      <SigninSignout user={user} handleClose={handleClose} />
    </div>

  )
}



export default connect()(DrawerNav)
