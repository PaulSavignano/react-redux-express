import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

const SigninSignout = ({ dispatch }) => {
  return (
    <IconMenu
      iconButtonElement={
        <IconButton style={{ padding: '20px 12px 4px 12px'}}><MoreVertIcon /></IconButton>
      }
      style={{ verticalAlign: 'middle' }}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem primaryText="Sign in" onTouchTap={() => dispatch(push('/signin'))} />
      <MenuItem primaryText="Sign up" onTouchTap={() => dispatch(push('/signup'))}/>
    </IconMenu>
  )
}


export default connect()(SigninSignout)
