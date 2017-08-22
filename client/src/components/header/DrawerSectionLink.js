import React, { Component } from 'react'
import PropTypes from 'prop-types'
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

DrawerSectionLink.propTypes = {
  dispatch: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired
}

export default DrawerSectionLink
