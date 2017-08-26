import React, { Component } from 'react'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

class AdminSectionAddSection extends Component {
  handleSectionAdd = () => {
    const {
      section: { action },
      dispatch,
      handleCloseMenu,
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

export default AdminSectionAddSection
