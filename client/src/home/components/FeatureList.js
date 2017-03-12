import React, { Component } from 'react'

import moreFrom1 from './images/more-from-1.png'
import moreFrom4 from './images/more-from-4.png'
import moreFrom2 from './images/more-from-2.png'
import moreFrom3 from './images/more-from-2.png'

class Features extends Component {
  render() {
    return (
      <div className="android-more-section">
        <div className="android-section-title mdl-typography--display-1-color-contrast">More from Android</div>
        <div className="android-card-container mdl-grid">
          <div className="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp">
            <div className="mdl-card__media">
              <img src={moreFrom1} alt="more1"/>
            </div>
            <div className="mdl-card__title">
              <h4 className="mdl-card__title-text">Get going on Android</h4>
            </div>
            <div className="mdl-card__supporting-text">
              <span className="mdl-typography--font-light mdl-typography--subhead">Four tips to make your switch to Android quick and easy</span>
            </div>
            <div className="mdl-card__actions">
              <a className="android-link mdl-button mdl-js-button mdl-typography--text-uppercase" href="">
                Make the switch
                <i className="material-icons">chevron_right</i>
              </a>
            </div>
          </div>

          <div className="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp">
            <div className="mdl-card__media">
              <img src={moreFrom4} alt="more2"/>
            </div>
            <div className="mdl-card__title">
              <h4 className="mdl-card__title-text">Create your own Android character</h4>
            </div>
            <div className="mdl-card__supporting-text">
              <span className="mdl-typography--font-light mdl-typography--subhead">Turn the little green Android mascot into you, your friends, anyone!</span>
            </div>
            <div className="mdl-card__actions">
              <a className="android-link mdl-button mdl-js-button mdl-typography--text-uppercase" href="">
                androidify.com
                <i className="material-icons">chevron_right</i>
              </a>
            </div>
          </div>

          <div className="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp">
            <div className="mdl-card__media">
              <img src={moreFrom2} alt="more3"/>
            </div>
            <div className="mdl-card__title">
              <h4 className="mdl-card__title-text">Get a clean customisable home screen</h4>
            </div>
            <div className="mdl-card__supporting-text">
              <span className="mdl-typography--font-light mdl-typography--subhead">A clean, simple, customisable home screen that comes with the power of Google Now: Traffic alerts, weather and much more, just a swipe away.</span>
            </div>
            <div className="mdl-card__actions">
              <a className="android-link mdl-button mdl-js-button mdl-typography--text-uppercase" href="">
                Download now
                <i className="material-icons">chevron_right</i>
              </a>
            </div>
          </div>

          <div className="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp">
            <div className="mdl-card__media">
              <img src={moreFrom3} alt="more4"/>
            </div>
            <div className="mdl-card__title">
              <h4 className="mdl-card__title-text">Millions to choose from</h4>
            </div>
            <div className="mdl-card__supporting-text">
              <span className="mdl-typography--font-light mdl-typography--subhead">Hail a taxi, find a recipe, run through a temple – Google Play has all the apps and games that let you make your Android device uniquely yours.</span>
            </div>
            <div className="mdl-card__actions">
              <a className="android-link mdl-button mdl-js-button mdl-typography--text-uppercase" href="">
                Find apps
                <i className="material-icons">chevron_right</i>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Features
