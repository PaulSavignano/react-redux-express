import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'

import AppBarSectionLink from './AppBarSectionLink'

class AppBarPageLink extends Component {
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
  handleCloseMenu = () => this.setState({ openMenu: false })
  render() {
    const {
      color,
      dispatch,
      fontFamily,
      page,
    } = this.props
    const pageSectionLinks = page.sections.filter(section => section.values.pageLink)
    return (
        <FlatButton
          onMouseEnter={this.handleButtonMouseEnter}
          onMouseLeave={this.handleButtonMouseLeave}
          style={{ color, minWidth: 'none', margin: '0 16px' }}
          labelStyle={{ padding: '0 0 2px 0', fontFamily }}
          label={page.values.name}
          hoverColor="none"
          containerElement={<NavLink to={`/${page.slug}`} activeClassName="active-nav"/>}
          children={
            pageSectionLinks.length ?
              <Popover
                key={1}
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
                    <AppBarSectionLink
                      dispatch={dispatch}
                      key={link._id}
                      link={link}
                      page={page}
                      onCloseMenu={this.handleCloseMenu}
                    />
                  ))}
                </Menu>
              </Popover>
            : null
          }
        />
      )
    }
  }


AppBarPageLink.propTypes = {
  color: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  fontFamily: PropTypes.string.isRequired,
  page: PropTypes.object,
}

export default AppBarPageLink
