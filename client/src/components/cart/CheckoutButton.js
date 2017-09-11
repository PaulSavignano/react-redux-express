import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

class CheckoutButton extends Component {
  handleNavigation = () => {
    const { dispatch, user } = this.props
    if (!user.values.email) return dispatch(push('/user/signin'))
    return dispatch(push('/user/order'))
  }
  render() {
    const { user } = this.props
    return (
      <CardActions>
        <RaisedButton
          label="Checkout"
          primary={true}
          fullWidth={true}
          onTouchTap={this.handleNavigation}
        />
      </CardActions>
    )
  }
}

CheckoutButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default CheckoutButton
