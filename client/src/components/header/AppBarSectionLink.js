import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'

class AppBarSectionLink extends Component {
  render() {
    const {
      link: { values: { pageLink }},
      onCloseMenu,
      page
    } = this.props
    return (
      <Link
        to={`/${page.slug}#${pageLink}`}
        onTouchTap={onCloseMenu}
      >
        <MenuItem
          primaryText={pageLink}
        />
      </Link>

    )
  }
}

AppBarSectionLink.propTypes = {
  dispatch: PropTypes.func.isRequired,
  link: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired
}

export default AppBarSectionLink
