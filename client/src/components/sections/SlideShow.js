import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import renderHTML from 'react-render-html'
import { Card, CardMedia, CardText } from 'material-ui/Card'

import slideShowContainer from '../../containers/sections/slideShowContainer'
import renderComponents from './renderComponents'

class SlideShow extends Component {
  state = {
    index: 0,
    intervalId: null
  }
  componentWillMount() {
    if (this.props.autoplay) {
      this.start()
    }
  }
  componentWillReceiveProps({ autoplay }) {
    if (!autoplay) {
      this.stop()
    }
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }
  start = () => {
    const intervalId = setInterval(() => {
      if (this.state.index < this.props.item.items.length - 1) return this.setState({ index: this.state.index + 1 })
      this.setState({ index: 0 })
    }, 4000)
    this.setState({ intervalId })
  }
  stop = () => {
    clearInterval(this.state.intervalId)
    this.setState({ intervalId: null })
  }
  render() {
    const {
      autoplay,
      dispatch,
      item: {
        _id,
        items
      },
      propsForParent,
      propsForChild,
    } = this.props
    return (
      <section {...propsForParent}>
        <CSSTransitionGroup
          transitionName="cross-fade"
          transitionEnter={true}
          transitionEnterTimeout={2000}
          transitionLeave={true}
          transitionLeaveTimeout={2000}
          {...propsForChild}
        >
          {renderComponents({ components: items })[this.state.index]}
        </CSSTransitionGroup>
      </section>
    )
  }
}

export default slideShowContainer(SlideShow)
