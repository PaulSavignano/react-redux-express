import React, { Component } from 'react'
import andy from './images/andy.png'

// const styles = {
//   hero: {
//     backgroundImage: `url(${Background})`
//   }
// }

class Hero extends Component {
  render() {
    return (
      <div className="android-be-together-section mdl-typography--text-center">
        <div className="logo-font android-slogan">be together. not the same.</div>
        <div className="logo-font android-sub-slogan">welcome to android... be yourself. do your thing. see what's going on.</div>
        <div className="logo-font android-create-character">
          <a href=""><img src={andy} alt="character"/> create your android character</a>
        </div>
      </div>
    )
  }
}

export default Hero
