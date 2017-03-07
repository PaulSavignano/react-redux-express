import React, { Component } from 'react'

import './Footer.css'

class Footer extends Component {
  render() {
    return (
      <footer className="android-footer mdl-mega-footer">
        <div className="mdl-mega-footer--top-section">
          <div className="mdl-mega-footer--left-section">
            <button className="mdl-mega-footer--social-btn"></button>
            &nbsp;
            <button className="mdl-mega-footer--social-btn"></button>
            &nbsp;
            <button className="mdl-mega-footer--social-btn"></button>
          </div>
          <div className="mdl-mega-footer--right-section">
            <a className="mdl-typography--font-light" href="#top">
              Back to Top
              <i className="material-icons">expand_less</i>
            </a>
          </div>
        </div>

        <div className="mdl-mega-footer--middle-section">
          <p className="mdl-typography--font-light">Satellite imagery: © 2014 Astrium, DigitalGlobe</p>
          <p className="mdl-typography--font-light">Some features and devices may not be available in all areas</p>
        </div>

        <div className="mdl-mega-footer--bottom-section">
          <a className="android-link android-link-menu mdl-typography--font-light" id="version-dropdown">
            Versions
            <i className="material-icons">arrow_drop_up</i>
          </a>
          <ul className="mdl-menu mdl-js-menu mdl-menu--top-left mdl-js-ripple-effect" htmlFor="version-dropdown">
            <li className="mdl-menu__item">5.0 Lollipop</li>
            <li className="mdl-menu__item">4.4 KitKat</li>
            <li className="mdl-menu__item">4.3 Jelly Bean</li>
            <li className="mdl-menu__item">Android History</li>
          </ul>
          <a className="android-link android-link-menu mdl-typography--font-light" id="developers-dropdown">
            For Developers
            <i className="material-icons">arrow_drop_up</i>
          </a>
          <ul className="mdl-menu mdl-js-menu mdl-menu--top-left mdl-js-ripple-effect" htmlFor="developers-dropdown">
            <li className="mdl-menu__item">App developer resources</li>
            <li className="mdl-menu__item">Android Open Source Project</li>
            <li className="mdl-menu__item">Android SDK</li>
            <li className="mdl-menu__item">Android for Work</li>
          </ul>
          <a className="android-link mdl-typography--font-light" href="">Blog</a>
          <a className="android-link mdl-typography--font-light" href="">Privacy Policy</a>
        </div>

      </footer>
    )
  }
}

export default Footer
