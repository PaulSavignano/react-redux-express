import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { ListItem } from 'material-ui/List'

import { toggleDrawer } from '../../actions/drawer'

class DrawerAdminPageLink extends Component {
  handleNavigation = () => {
    const { dispatch, page } = this.props
    dispatch(push(`/admin/pages/${page.slug}`))
    dispatch(toggleDrawer())
  }
  render() {
    const { page } = this.props
    return (
      <ListItem
        key={page._id}
        primaryText={page.name}
        onTouchTap={this.handleNavigation}
      />
    )
  }
}

export default DrawerAdminPageLink
