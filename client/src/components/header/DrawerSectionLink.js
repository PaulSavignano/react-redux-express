import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { ListItem } from 'material-ui/List'

class DrawerSectionLink extends Component {
  handleSectionNavigation = () => {
    const { dispatch, page, link } = this.props
    return dispatch(push(`/${page.slug}#${link.values.pageLink}`))
  }
  render() {
    const { link } = this.props
    return (
      <ListItem
        key={link._id}
        primaryText={link.values.pageLink}
        onTouchTap={this.handleSectionNavigation}
      />
    )
  }
}

export default DrawerSectionLink
