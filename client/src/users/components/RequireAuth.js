import React, { Component } from 'react'
import { connect } from 'react-redux'


const RequireAuth = (ComposedComponent, roles) => {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }
    hasRoles = (roles) => {
      if (this.props.roles) {
        return roles.some(v=> this.props.roles.indexOf(v) >= 0)
      } else {
        return false
      }
    }
    componentWillMount() {
      if (!this.hasRoles(roles)) {
        this.context.router.push('/signin');
      }
    }
    componentWillUpdate(nextProps) {
      if (nextProps.roles !== roles) {
        this.context.router.push('/signin');
      }
    }
    render() {
      return (
        this.hasRoles(roles) ? <ComposedComponent {...this.props} /> : null
      )
    }
  }
  const mapStateToProps = (state) => ({
    roles: state.user.roles
  })
  return connect(mapStateToProps)(Authentication);
}


export default RequireAuth
