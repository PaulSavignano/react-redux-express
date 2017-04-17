import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import MenuItem from 'material-ui/MenuItem'

const DrawerMenu = (props) => {
  return (
    <div>
      <MenuItem onClick={() => {
        props.dispatch(push('/admin/home'))
        props.handleToggle()
      }}>Home Page Admin</MenuItem>
      <MenuItem>Menu Item 2</MenuItem>
    </div>
  )
}


export default connect()(DrawerMenu)
