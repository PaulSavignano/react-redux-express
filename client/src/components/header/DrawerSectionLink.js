import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ListItem } from 'material-ui/List'

import { toggleDrawer } from '../../actions/drawer'

class DrawerSectionLink extends Component {
  handleToggleDrawer = () => this.props.dispatch(toggleDrawer())
  render() {
    const {
      link,
      page
    } = this.props
    return (
      <ListItem
        key={link._id}
        primaryText={link.values.pageLink}
        onTouchTap={this.handleToggleDrawer}
        innerDivStyle={{ marginLeft: 16 }}
        containerElement={<Link to={`/${page.slug}#${link.values.pageLink}`}/>}
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
