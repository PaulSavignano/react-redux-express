import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

class CheckoutButton extends Component {
  handleNavigation = () => {
    const { dispatch, user: { values: { email }}} = this.props
    if (!email) return dispatch({ type: 'REDIRECT_USER', path: '/user/order' })
    return
  }
  render() {
    const { user } = this.props
    return (
      <CardActions>
        <RaisedButton
          onTouchTap={this.handleNavigation}
          containerElement={<Link to={user.values.email ? '/user/order' : '/user/signin'}/>}
          label="Checkout"
          primary={true}
          fullWidth={true}
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
