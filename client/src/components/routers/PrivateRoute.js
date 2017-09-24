import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

import userContainer from '../../containers/user/userContainer'

class PrivateRoute extends Component {
  hasRoles = (roles, requiredRoles) => {
    if (roles) return requiredRoles.some(v => roles.indexOf(v) >= 0)
    return false
  }
  render() {
    const {
      component: Component,
      requiredRoles,
      user,
      ...rest,
    } = this.props
    return (
      <Route {...rest} component={(props) => (
        this.hasRoles(user.roles, requiredRoles) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/user/signin" />
        )
      )}/>
    )
  }
}

PrivateRoute.propTypes = {
  user: PropTypes.object.isRequired,
}

export default userContainer(PrivateRoute)
