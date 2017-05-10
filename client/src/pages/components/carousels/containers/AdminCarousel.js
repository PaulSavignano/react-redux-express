import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardActions } from 'material-ui/Card'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import RaisedButton from 'material-ui/RaisedButton'
import { fetchAddCard, fetchDeleteCard } from '../actions/card'

class AdminCard extends Component {
  state = {
    zDepth: 1
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { dispatch } = this.props
    return (
      <section><CardAdd /></section>
    )
  }
}

export default connect()(AdminCard)
