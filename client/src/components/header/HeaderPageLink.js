import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import FlatButton from 'material-ui/FlatButton'

import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

class HeaderPageLink extends Component {
  state = {
    anchorEl: null,
    openMenu: false,
    usingMenu: false,
    timeoutId: null
  }
  componentWillUnmount() {
    clearTimeout(this.state.timeoutId)
  }
  handleButtonMouseEnter = (e) => {
    this.setState({
      openMenu: true,
      anchorEl: e.currentTarget
    })
  }
  handleButtonMouseLeave = () => {
    if (this.state.usingMenu) return
    const timeoutId = setTimeout(() => {
      if (this.state.usingMenu) return
      this.setState({ openMenu: false, anchorEl: null })
    }, 100)
    this.setState({ timeoutId })
  }
  handleMenuMouseEnter = () => this.setState({ usingMenu: true })
  handleMenuMouseLeave = () => {
    this.setState({ openMenu: false, anchorEl: null, usingMenu: false })
  }
  render() {
    const {
      color,
      dispatch,
      fontFamily,
      page,
      pathname,
      sections
    } = this.props
    const pageSections = page.sections.map(section => sections.find(item => item._id === section.sectionId))
    const pageSectionLinks = pageSections ? pageSections.filter(item => item.values.pageLink) : []
    const activeStyle = pathname === `/${page.slug}` && { borderBottom: '2px solid' }
    return (
      <div>
        <FlatButton
          onMouseEnter={this.handleButtonMouseEnter}
          onMouseLeave={this.handleButtonMouseLeave}
          style={{ color, minWidth: 'none', margin: '0 16px' }}
          labelStyle={{ padding: '0 0 2px 0', fontFamily, ...activeStyle }}
          onTouchTap={() => dispatch(push(`/${page.slug}`))}
          label={page.name}
          hoverColor="none"
        />
        {pageSectionLinks.length ?
          <Popover
            useLayerForClickAway={false}
            open={this.state.openMenu}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={() => this.setState({ openMenu: false })}
            animation={PopoverAnimationVertical}
          >
            <Menu
              onMouseEnter={this.handleMenuMouseEnter}
              onMouseLeave={this.handleMenuMouseLeave}
            >
              {pageSectionLinks.map(link => (
                <MenuItem
                  key={link._id}
                  primaryText={link.values.pageLink}
                  onTouchTap={() => {
                    this.setState({ openMenu: false })
                    return dispatch(push(`/${page.slug}#${link.values.pageLink}`))
                  }}/>
              ))}
            </Menu>
          </Popover>
        : null
        }
      </div>
    )
  }
}

export default HeaderPageLink
