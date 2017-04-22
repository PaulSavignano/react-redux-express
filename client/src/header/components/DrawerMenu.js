import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import MenuItem from 'material-ui/MenuItem'

const DrawerMenu = ({ pages, dispatch, handleToggle }) => {
  return (
    <div>
      

      <MenuItem onClick={() => {
        dispatch(push('/admin/pages/add'))
        handleToggle()
      }}>Admin Pages Add</MenuItem>
      <MenuItem>Menu Item 2</MenuItem>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    pages: state.pages
  }
}

export default connect(mapStateToProps)(DrawerMenu)

/*
{pages.map(page => (
  <MenuItem key={page._id} onClick={() => {
    dispatch(push(`/admin/pages/update/${page._id}`))
    handleToggle()
  }}>{page.name} Page Admin</MenuItem>
))}
*/
