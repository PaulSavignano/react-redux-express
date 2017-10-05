import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'

import { signout } from '../../actions/user'

class UserButtons extends Component {
  handleSignout = () => {
    const { dispatch, history, onSelect } = this.props
    onSelect()
    return dispatch(signout(history))
  }
  render() {
    const {
      firstName,
      onSelect
    } = this.props
    return (
      firstName ?
        <div>
          <MenuItem
            primaryText="Profile"
            onTouchTap={onSelect}
            containerElement={<Link to="/user/profile" />}
          />
          <MenuItem
            primaryText="Sign out"
            onTouchTap={this.handleSignout}
          />
        </div>
      :
      <div>
        <MenuItem
          primaryText="Sign in"
          onTouchTap={onSelect}
          containerElement={<Link to="/user/signin" />}
        />
        <MenuItem
          primaryText="Sign up"
          onTouchTap={onSelect}
          containerElement={<Link to="/user/signup" />}
        />
      </div>
    )
  }
}

UserButtons.propTypes = {
  firstName: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default UserButtons
