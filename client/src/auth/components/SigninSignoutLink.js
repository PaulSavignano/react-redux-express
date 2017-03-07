import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class SigninSignoutLink extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to="/signout" className="mdl-navigation__link mdl-typography--text-uppercase">Sign out</Link>
        </div>
      )
    } else {
      return (
        <div>
          <Link to="/signin" className="mdl-navigation__link mdl-typography--text-uppercase">Sign In</Link>
          <Link to="/signup" className="mdl-navigation__link mdl-typography--text-uppercase">Sign Up</Link>
        </div>
      )
    }
  }
  render() {
    return (
      <div>
        { this.renderLinks() }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
};

export default connect(mapStateToProps)(SigninSignoutLink)
