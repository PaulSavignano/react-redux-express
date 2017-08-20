import React, { Component } from 'react'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

import { stopEdit } from '../../actions/sections'

class AdminSectionEditButton extends Component {
  handleComponentAdd = () => {
    const { component: { action }, dispatch, item, pageSlug } = this.props
    dispatch(action({ pageSlug, sectionId: item._id }))
    this.setState({ openMenu: false })
    dispatch(stopEdit(item._id))
  }
  render() {
    const { component, dispatch, item, pageSlug  } = this.props
    return (
      <MenuItem
        key={component.label}
        primaryText={component.label}
        onTouchTap={this.handleComponentAdd}
      />
    )
  }
}

export default AdminSectionEditButton
