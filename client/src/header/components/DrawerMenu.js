import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import MenuItem from 'material-ui/MenuItem'

const DrawerMenu = ({ isFetching, pages, dispatch, handleToggle }) => {
  return (
    !isFetching ?
    <div>
      {pages.map(page => (
        <MenuItem key={page._id} onTouchTap={() => {
          dispatch(push(`/admin/pages/${page.slug}`))
          handleToggle()
        }}>{page.name} Page Admin</MenuItem>
      ))}

      <MenuItem onTouchTap={() => {
        dispatch(push('/admin/pages'))
        handleToggle()
      }}>Admin Pages Add</MenuItem>

      <MenuItem onTouchTap={() => {
        dispatch(push('/contact'))
        handleToggle()
      }}>Contact</MenuItem>

      <MenuItem onTouchTap={() => {
        dispatch(push('/admin/pages/component'))
        handleToggle()
      }}>Admin Page Component Select</MenuItem>
      <MenuItem>Menu Item 2</MenuItem>
    </div>
    : null
  )
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.pages.isFetching,
    pages: state.pages.items
  }
}

export default connect(mapStateToProps)(DrawerMenu)
