import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'


const SigninSignout2 = (props) => {
  const { dispatch } = props
  return (
    <IconMenu
      iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }
      iconStyle={{ marginTop: '-12px' }}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem primaryText="Sign in" onClick={() => dispatch(push('/signin'))} />
      <MenuItem primaryText="Sign up" onClick={() => dispatch(push('/signup'))}/>
    </IconMenu>
  )
}


const mapStateToProps = (state) => ({
  state
})

export default connect(mapStateToProps)(SigninSignout2)
