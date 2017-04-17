import React, { Component } from 'react'
import { Link } from 'react-router'

class Drawer extends Component {
  render() {
    return (
      <div className="android-drawer mdl-layout__drawer">
        <nav className="mdl-navigation">
          <Link className="mdl-navigation__link mdl-typography--text-uppercase" to="/contact">Contact</Link>
          <a className="mdl-navigation__link" href="">Tablets</a>
          <a className="mdl-navigation__link" href="">Wear</a>
          <a className="mdl-navigation__link" href="">TV</a>
          <a className="mdl-navigation__link" href="">Auto</a>
          <a className="mdl-navigation__link" href="">One</a>
          <a className="mdl-navigation__link" href="">Play</a>
          <div className="android-drawer-separator"></div>
          <span className="mdl-navigation__link" href="">Versions</span>
          <a className="mdl-navigation__link" href="">Lollipop 5.0</a>
          <a className="mdl-navigation__link" href="">KitKat 4.4</a>
          <a className="mdl-navigation__link" href="">Jelly Bean 4.3</a>
          <a className="mdl-navigation__link" href="">Android history</a>
          <div className="android-drawer-separator"></div>
          <span className="mdl-navigation__link" href="">Resources</span>
          <a className="mdl-navigation__link" href="">Official blog</a>
          <a className="mdl-navigation__link" href="">Android on Google+</a>
          <a className="mdl-navigation__link" href="">Android on Twitter</a>
          <div className="android-drawer-separator"></div>
          <span className="mdl-navigation__link" href="">For developers</span>
          <a className="mdl-navigation__link" href="">App developer resources</a>
          <a className="mdl-navigation__link" href="">Android Open Source Project</a>
          <a className="mdl-navigation__link" href="">Android SDK</a>
        </nav>
      </div>
    )
  }
}

export default Drawer
