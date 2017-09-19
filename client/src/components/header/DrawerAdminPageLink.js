import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ListItem } from 'material-ui/List'

import { toggleDrawer } from '../../actions/drawer'

class DrawerAdminPageLink extends Component {
  handleDrawerClose = () => this.props.dispatch(toggleDrawer())
  render() {
    const {
      page: {
        _id,
        slug,
        values: { name }
      }
    } = this.props
    return (
      <ListItem
        containerElement={<Link to={`/admin/pages/${slug}`} />}
        key={_id}
        primaryText={name}
        onTouchTap={this.handleDrawerClose}
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
