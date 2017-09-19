import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

class CheckoutButton extends Component {
  render() {
    const { user } = this.props
    return (
      <CardActions>
        <RaisedButton
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
