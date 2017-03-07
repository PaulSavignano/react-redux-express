import React, { Component } from 'react'

import './Hero.css'
import andy from './images/andy.png'

class Hero extends Component {
  render() {
    return (
      <div className="android-be-together-section mdl-typography--text-center">
        <div className="logo-font android-slogan">be together. not the same.</div>
        <div className="logo-font android-sub-slogan">welcome to android... be yourself. do your thing. see what's going on.</div>
        <div className="logo-font android-create-character">
          <a href=""><img src={andy} /> create your android character</a>
        </div>
      </div>
    )
  }
}

export default Hero
