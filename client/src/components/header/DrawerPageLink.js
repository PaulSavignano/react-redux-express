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
      sections,
      handleTouchTap
    } = this.props
    const pageSectionLinks = page.sections.filter(section => section.section.values.pageLink)
    if (pageSectionLinks.length) {
      return (
        <ListItem
          onTouchTap={this.handlePageNavigation}
          primaryText={page.name}
          initiallyOpen={false}
          primaryTogglesNestedList={true}
          nestedItems={pageSectionLinks.map(link => (
            <DrawerSectionLink
              key={link._id}
              link={link}
            />
          ))}
        />
      )
    } else {
      return (
        <ListItem
          onTouchTap={this.handlePageNavigation}
          primaryText={page.name}
        />
      )
    }
  }
}

export default DrawerPageLink
