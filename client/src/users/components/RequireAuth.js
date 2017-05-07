import React, { Component } from 'react'
import { connect } from 'react-redux'


const RequireAuth = (ComposedComponent, roles) => {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }
    hasRoles = (roles, userRoles) => {
      if (userRoles) {
        return roles.some(v => userRoles.indexOf(v) >= 0)
      } else {
        return false
      }
    }
    componentWillMount() {
      if (!this.hasRoles(roles, this.props.userRoles)) {
        this.context.router.push('/signin')
      }
    }
    componentWillUpdate(nextProps) {
      if (!this.hasRoles(roles, nextProps.roles)) {
        this.context.router.push('/signin')
      }
    }
    render() {
      return (
        this.props.isFetching ? null : <ComposedComponent {...this.props} />
      )
    }
  }
  const mapStateToProps = (state) => {
    if (!state.user.isFetching) {
      return {
        isFetching: state.user.isFetching,
        userRoles: state.user.roles
      }
    }
    return {
      isFetching: state.user.isFetching,
      userRoles: []
    }
  }
  return connect(mapStateToProps)(Authentication);
}


export default RequireAuth
