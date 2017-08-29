import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { ListItem } from 'material-ui/List'

import DrawerSectionLink from './DrawerSectionLink'
import { toggleDrawer } from '../../actions/drawer'

class DrawerPageLink extends Component {
  handlePageNavigation = () => {
    const { dispatch, page } = this.props
    dispatch(push(`/${page.slug}`))
    dispatch(toggleDrawer())
  }
  render() {
    const {
      dispatch,
      page,
    } = this.props
    const pageSectionLinks = page.sections.filter(section => section.values.pageLink)
    if (pageSectionLinks.length) {
      return (
        <ListItem
          onTouchTap={this.handlePageNavigation}
          primaryText={page.values.name}
          initiallyOpen={false}
          primaryTogglesNestedList={true}
          nestedItems={pageSectionLinks.map(link => (
            <DrawerSectionLink
              dispatch={dispatch}
              key={link._id}
              link={link}
              page={page}
            />
          ))}
        />
      )
    } else {
      return (
        <ListItem
          onTouchTap={this.handlePageNavigation}
          primaryText={page.values.name}
        />
      )
    }
  }
}

DrawerPageLink.propTypes = {
  dispatch: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired
}

export default DrawerPageLink
