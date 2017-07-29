import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import FlatButton from 'material-ui/FlatButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'

import SigninSignout from '../users/SigninSignout'

class HeaderUser extends Component {
  state = {
    openMenu: false
  }
  handleOpen = (e) => {
    e.preventDefault()
    this.setState({
      openMenu: true,
      anchorEl: e.currentTarget,
    })
  }
  handleTouchTap = (path) => {
    this.setState({ openMenu: false })
    return this.props.dispatch(push(path))
  }
  render() {
    const { color, firstName, fontFamily } = this.props
    return (
      <span style={{ fontFamily }} className="appbar-user">
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
      </span>
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
