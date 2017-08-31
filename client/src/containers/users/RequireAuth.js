import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const RequireAuth = (ComposedComponent, requiredRoles) => {
  class Authentication extends Component {
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
      const { isFetching } = this.props
      return (
        !isFetching && <ComposedComponent {...this.props} />
      )
    }
  }
  const mapStateToProps = ({ user }) => ({
    isFetching: user.isFetching,
    user
  })
  return connect(mapStateToProps)(Authentication)
}

export default RequireAuth
