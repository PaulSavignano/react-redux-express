import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
    const { page: { _id, values: { name }}} = this.props
    return (
      <ListItem
        key={_id}
        primaryText={name}
        onTouchTap={this.handleNavigation}
        innerDivStyle={{ marginLeft: 36 }}
      />
    )
  }
}

DrawerAdminPageLink.propTypes = {
  dispatch: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
}

export default DrawerAdminPageLink
