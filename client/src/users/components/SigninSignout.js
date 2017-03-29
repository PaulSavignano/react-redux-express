import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class SigninSignout extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <ul className="mdl-menu mdl-js-menu mdl-menu--bottom-right mdl-js-ripple-effect" htmlFor="more-button">
          <li className="mdl-menu__item">
            <Link to="/signout" className="mdl-navigation__link mdl-typography--text-uppercase">Sign out</Link>
          </li>
        </ul>
      )
    } else {
      return (
        <ul className="mdl-menu mdl-js-menu mdl-menu--bottom-right mdl-js-ripple-effect" htmlFor="more-button">
          <li className="mdl-menu__item">
            <Link to="/signin" className="mdl-navigation__link mdl-typography--text-uppercase">Sign In</Link>
          </li>
          <li className="mdl-menu__item">
            <Link to="/signup" className="mdl-navigation__link mdl-typography--text-uppercase">Sign Up</Link>
          </li>
        </ul>
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

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(SigninSignout)
