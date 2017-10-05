import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'

import './header.css'
import UserButtons from './UserButtons'
import { signout } from '../../actions/user'

class AppBarUser extends Component {
  state = {
    anchorEl: null,
    horizontal: 'left',
    navClass: null,
    openMenu: false,
    width: 0,
  }
  handleOpenMenu = (e) => {
    e.preventDefault()
    this.setState({ openMenu: true, anchorEl: e.currentTarget })
  }
  handleCloseMenu = () => this.setState({ openMenu: false, anchorEl: null })
  handleSignout = () => {
    const { dispatch, history } = this.props
    this.handleCloseMenu()
    return dispatch(signout(history))
  }
  componentDidMount() {
    const { cartQty } = this.props
    const width = this.userNav.clientWidth
    const totalWidth = width/.2
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
    const horizontal = cartQty > 0 ? 'left' : 'right'
    this.setState({ horizontal, navClass, width })
  }
  componentWillReceiveProps({ cartQty }) {
    if (cartQty !== this.props.cartQty) {
      const horizontal = cartQty > 0 ? 'left' : 'right'
      this.setState({ horizontal })
    }
  }
  render() {
    const { horizontal, navClass } = this.state
    const {
      color,
      dispatch,
      firstName,
      fontFamily,
      history,
    } = this.props
    return (
      <div
        ref={ (userNav) => this.userNav = userNav}
        style={{ fontFamily, display: 'flex', alignItems: 'center' }}
        className={navClass}
      >
        <FlatButton
          onTouchTap={this.handleOpenMenu}
          label={firstName ? `Hello, ${firstName}`: `SIGN IN`}
          labelStyle={{ padding: 0 }}
          hoverColor="none"
          style={{ color, fontFamily, minWidth: 'none', margin: '0 0 0 24px' }}
        />
        <Popover
          open={this.state.openMenu}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal, vertical: 'bottom'}}
          targetOrigin={{ horizontal, vertical: 'top'}}
          onRequestClose={this.handleCloseMenu}
          animation={PopoverAnimationVertical}
        >
          <Menu>
            <UserButtons
              history={history}
              dispatch={dispatch}
              firstName={firstName}
              onSelect={this.handleCloseMenu}
            />
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
  fontFamily: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(AppBarUser)
