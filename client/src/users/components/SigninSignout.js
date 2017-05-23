import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import MenuItem from 'material-ui/MenuItem'

import { fetchSignout } from '../actions/index'

const SigninSignout = ({ dispatch, user, handleCloseMenu }) => {
  return (
    user.values.email ?
      <div>
        <MenuItem primaryText="Sign out" onTouchTap={() => {
          dispatch(fetchSignout())
          dispatch(push('/signin'))
          handleCloseMenu()
        }}/>
      </div>
    :
      <div>
        <MenuItem primaryText="Sign in"
          onTouchTap={() => {
            dispatch(push('/signin'))
            handleCloseMenu()
          }}
        />
        <MenuItem primaryText="Sign up"
          onTouchTap={() => {
            dispatch(push('/signup'))
            handleCloseMenu()
          }}/>
      </div>
  )
}

export default connect()(SigninSignout)
