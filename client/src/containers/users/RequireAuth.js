import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const RequireAuth = (ComposedComponent, roles) => {
  class Authentication extends Component {
    hasRoles = (roles) => {
      const userRoles = this.props.userRoles
      if (userRoles) return roles.some(v => userRoles.indexOf(v) >= 0)
      return false
    }
    componentWillMount() {
      if (!this.hasRoles(roles, this.props.userRoles)) {
        this.props.dispatch(push('/user/signin'))
      }
    }
    componentWillUpdate(nextProps) {
      if (!this.hasRoles(roles, nextProps.roles)) {
        this.props.dispatch(push('/user/signin'))
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
    userRoles: user.roles
  })
  return connect(mapStateToProps)(Authentication)
}

export default RequireAuth
