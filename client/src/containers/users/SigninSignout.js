import React from 'react'
import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem'

import { fetchSignout } from '../../actions/users'

const SigninSignout = ({ dispatch, firstName, handleTouchTap }) => {
  return (
    firstName ?
      <div>
        <MenuItem primaryText="Sign out" onTouchTap={() => {
          dispatch(fetchSignout())
          handleTouchTap('/user/signin')
        }}/>
        <MenuItem primaryText="Profile" onTouchTap={() => {
          handleTouchTap('/user/profile')
        }}/>
      </div>
    :
      <div>
        <MenuItem primaryText="Sign in"
          onTouchTap={() => {
            handleTouchTap('/user/signin')
          }}
        />
        <MenuItem primaryText="Sign up"
          onTouchTap={() => {
            handleTouchTap('/user/signup')
          }}/>
      </div>
  )
}

export default connect()(SigninSignout)
