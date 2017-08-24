import React, { Component } from 'react'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

import { stopEdit } from '../../actions/sections'

class AdminSectionEditButton extends Component {
  handleSectionAdd = () => {
    const {
      component: { action },
      dispatch,
      handleCloseMenu
      pageId,
    } = this.props
    dispatch(action({ pageId }))
    handleCloseMenu()
  }
  render() {
    const { section } = this.props
    return (
      <MenuItem
        primaryText={section.label}
        onTouchTap={this.handleSectionAdd}
      />
    )
  }
}

export default AdminSectionEditButton
