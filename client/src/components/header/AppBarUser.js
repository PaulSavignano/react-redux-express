import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import FlatButton from 'material-ui/FlatButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

import './header.css'
import { fetchSignout } from '../../actions/user'

class AppBarUser extends Component {
  state = {
    anchorEl: null,
    openMenu: false,
    navClass: null,
    width: 0,
  }
  handleOpen = (e) => {
    e.preventDefault()
    this.setState({ openMenu: true, anchorEl: e.currentTarget })
  }
  handleSignout = () => {
    const { dispatch } = this.props
    this.setState({ openMenu: false })
    dispatch(push('/user/signin'))
    return dispatch(fetchSignout())
  }
  handleProfile = () => {
    this.setState({ openMenu: false })
    return this.props.dispatch(push('/user/profile'))
  }
  handleSignin = () => {
    this.setState({ openMenu: false })
    return this.props.dispatch(push('/user/signin'))
  }
  handleSignup = () => {
    this.setState({ openMenu: false })
    return this.props.dispatch(push('/user/signup'))
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
          style={{ color, fontFamily, minWidth: 'none', margin: '0 0 0 8px' }}
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
            {firstName ?
              <div>
                <MenuItem primaryText="Sign out" onTouchTap={this.handleSignout}/>
                <MenuItem primaryText="Profile" onTouchTap={this.handleProfile}/>
              </div>
            :
            <div>
              <MenuItem primaryText="Sign in"
                onTouchTap={this.handleSignin}
              />
              <MenuItem primaryText="Sign up"
                onTouchTap={this.handleSignup}/>
            </div>
            }
          </Menu>
        </Popover>
      </div>
    )
  }
}

AppBarUser.propTypes = {
  color: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  fontFamily: PropTypes.string.isRequired
}

export default AppBarUser
