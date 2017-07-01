import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

class FlashSuccess extends Component {
  state = {
    submitted: false,
    flash: false
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitted && nextProps.submitted !== this.state.submitted) {
      this.setState({ submitted: true, flash: true })
      setTimeout(() => this.setState({ flash: false }), 900)
    }
  }
  render() {
    return (
      <CSSTransitionGroup
        transitionName="flash"
        transitionAppear={true}
        transitionAppearTimeout={900}
        transitionEnter={true}
        transitionLeave={true}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={900}
      >
        {this.state.flash ?
          <strong key={1} style={{ color: "#4CAF50" }}>Updated!</strong>
        :
        <strong key={0}/>
        }
      </CSSTransitionGroup>
    )
  }
}

export default FlashSuccess
