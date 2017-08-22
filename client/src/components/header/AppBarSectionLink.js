import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import MenuItem from 'material-ui/MenuItem'

class AppBarSectionLink extends Component {
  handleSectionNavigation = () => {
    const { dispatch, link, page } = this.props
    this.handleOpenMenu()
    return dispatch(push(`/${page.slug}#${link.values.pageLink}`))
  }
  render() {
    const { link, page } = this.props
    return (
      <MenuItem
        key={link._id}
        primaryText={link.values.pageLink}
        onTouchTap={this.handleSectionNavigation} />
    )
  }
}

AppBarSectionLink.propTypes = {
  dispatch: PropTypes.func.isRequired,
  link: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired
}

export default AppBarSectionLink
