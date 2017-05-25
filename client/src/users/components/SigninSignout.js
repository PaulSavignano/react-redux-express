import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import MenuItem from 'material-ui/MenuItem'

import { fetchSignout } from '../actions/index'

const SigninSignout = ({ dispatch, user, handleClose }) => {
  return (
    user.values.email ?
      <div>
        <MenuItem primaryText="Sign out" onTouchTap={() => {
          dispatch(fetchSignout())
          dispatch(push('/user/signin'))
          handleClose()
        }}/>
        <MenuItem primaryText="Profile" onTouchTap={() => {
          dispatch(push('/user/profile'))
          handleClose()
        }}/>
      </div>
    :
      <div>
        <MenuItem primaryText="Sign in"
          onTouchTap={() => {
            dispatch(push('/user/signin'))
            handleClose()
          }}
        />
        <MenuItem primaryText="Sign up"
          onTouchTap={() => {
            dispatch(push('/user/signup'))
            handleClose()
          }}/>
      </div>
  )
}

export default connect()(SigninSignout)
