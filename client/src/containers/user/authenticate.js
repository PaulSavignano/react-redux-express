import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'

import userContainer from './userContainer'

const authenticate = (ComposedComponent, requiredRoles) => {
  class Authenticate extends Component {
    hasRoles = (roles) => {
      if (roles) return requiredRoles.some(v => roles.indexOf(v) >= 0)
      return false
    }
    componentWillMount() {
      const { dispatch, user: { roles }} = this.props
      if (!this.hasRoles(roles)) {
        dispatch(push('/user/signin'))
      }
    }
    componentWillUpdate({ dispatch, user: { roles }}) {
      if (!this.hasRoles(roles)) {
        dispatch(push('/user/signin'))
      }
    }
    render() {
      return (
        <ComposedComponent {...this.props} />
      )
    }
  }
  Authenticate.propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  }

  return userContainer(Authenticate)
}

export default authenticate
