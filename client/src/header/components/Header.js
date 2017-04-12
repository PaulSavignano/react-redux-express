import React from 'react'
import { Link } from 'react-router'
import CartIcon from '../../products/components/CartIcon'

import NavLink from './NavLink'
import androidLogo from './images/android-logo.png'
import SigninSignout from '../../users/components/SigninSignout'


const Header = () => (
  <div className="android-header mdl-layout__header mdl-layout__header--waterfall">
    <div className="mdl-layout__header-row">
      <span className="android-title mdl-layout-title">
        <Link to="/" style={{ textDecoration: 'none', color: 'rgb(0, 188, 212)' }}><h3>Brand</h3></Link>
      </span>
      <div className="android-header-spacer mdl-layout-spacer"></div>

      <div className="android-navigation-container">
        <nav className="android-navigation mdl-navigation">
          <Link className="mdl-navigation__link mdl-typography--text-uppercase" to="/todos">Todos</Link>
          <NavLink className="mdl-navigation__link mdl-typography--text-uppercase" to="/products">Products</NavLink>
          <Link className="mdl-navigation__link mdl-typography--text-uppercase" to="/admin/products">Products Admin</Link>
          <Link className="mdl-navigation__link mdl-typography--text-uppercase" to="/checkout">Checkout</Link>
        </nav>
      </div>

      <div className="android-search-box mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right mdl-textfield--full-width">
        <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search-field">
          <i className="material-icons" style={{ paddingTop: 2 }}>search</i>
        </label>
        <div className="mdl-textfield__expandable-holder">
          <input className="mdl-textfield__input" type="text" id="search-field" />
        </div>
      </div>

      <button className="android-more-button mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect" id="more-button">
        <i className="fa fa-user-circle-o" aria-hidden="true"></i>
      </button>
      <SigninSignout />

      <div className="android-cart mdl-js-ripple-effect" id="more-button">
        <Link to="/cart">
          <CartIcon />
        </Link>
      </div>

    </div>
  </div>
)

export default Header
