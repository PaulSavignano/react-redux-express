import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem'

class AdminSectionAddComponent extends Component {
  handleAdd = (e) => {
    e.stopPropagation()
    const {
      component: { action },
      dispatch,
      handleCloseMenu,
      pageId,
      pageSlug,
      sectionId
    } = this.props
    dispatch(action({ pageId, pageSlug, sectionId }))
    handleCloseMenu()
  }
  render() {
    const { component: { label } } = this.props
    return (
      <MenuItem
        primaryText={label}
        onTouchTap={this.handleAdd}
      />
    )
  }
}

export default AdminSectionAddComponent
