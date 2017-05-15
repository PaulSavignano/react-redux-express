import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import MenuItem from 'material-ui/MenuItem'

import { fetchSignout } from '../actions/index'

const SigninSignout = ({ dispatch, user, handleChange }) => {
  return (
    user.values.email ?
      <div>
        <MenuItem primaryText="Sign out" onTouchTap={() => {
          dispatch(fetchSignout())
          dispatch(push('/signin'))
          handleChange()
        }}/>
      </div>
    :
      <div>
        <MenuItem primaryText="Sign in"
          onTouchTap={() => {
            dispatch(push('/signin'))
            handleChange()
          }}
        />
        <MenuItem primaryText="Sign up"
          onTouchTap={() => {
            dispatch(push('/signup'))
            handleChange()
          }}/>
      </div>
  )
}

export default connect()(SigninSignout)
