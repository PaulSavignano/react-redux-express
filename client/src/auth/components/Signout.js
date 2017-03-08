import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signoutUser } from '../actions/index'

import './Signout.css'

class Signout extends Component {
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(signoutUser())
  }
  render() {
    return (
      <div className="android-be-together-section mdl-typography--text-center">
        <div className="logo-font android-slogan">Sorry to see you go!</div>
        <div className="logo-font android-sub-slogan">Come again soon</div>
      </div>
    )
  }
}

export default connect()(Signout)
