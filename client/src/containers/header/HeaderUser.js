import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import FlatButton from 'material-ui/FlatButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'

import './header.css'
import SigninSignout from '../users/SigninSignout'

class HeaderUser extends Component {
  state = {
    openMenu: false,
    navClass: null,
    width: 0,
  }
  handleOpen = (e) => {
    e.preventDefault()
    this.setState({ openMenu: true, anchorEl: e.currentTarget })
  }
  handleTouchTap = (path) => {
    this.setState({ openMenu: false })
    return this.props.dispatch(push(path))
  }
  componentDidMount() {
    const width = this.userNav.clientWidth
    const totalWidth = width/.3
    let navClass
    switch(true) {
      case totalWidth < 375:
        navClass = 'largerThanIphone375'
        break
      case totalWidth < 667:
        navClass = 'largerThanIphone667'
        break
      case totalWidth < 768:
        navClass = 'largerThanIpad768'
        break
      case totalWidth < 1024:
        navClass = 'largerThanIpad1024'
        break
      case totalWidth < 1366:
        navClass = 'largerThanIpad1366'
        break
      default:
        navClass = 'largerThan1920'
    }
    this.setState({ navClass, width })
  }
  render() {
    const { navClass } = this.state
    const { color, firstName, fontFamily } = this.props
    return (
      <div
        ref={ (userNav) => this.userNav = userNav}
        style={{ fontFamily }}
        className={navClass}
      >
        <FlatButton
          onTouchTap={this.handleOpen}
          label={firstName ? `Hello, ${firstName}`: `SIGN IN`}
          labelStyle={{ padding: '0 0 0 4px' }}
          hoverColor="none"
          style={{ color, fontFamily }}
        />
        <Popover
          open={this.state.openMenu}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={() => this.setState({ openMenu: false })}
          animation={PopoverAnimationVertical}
        >
          <Menu>
            <SigninSignout firstName={firstName} handleTouchTap={this.handleTouchTap} />
          </Menu>
        </Popover>
      </div>
    )
  }
}

const mapStateToProps = ({
  brand: {
    appBar: { values: { navColor } }
  },
  user: { values: { firstName }}
}) => ({
  color: navColor,
  firstName
})

HeaderUser = connect(mapStateToProps)(HeaderUser)

export default HeaderUser
