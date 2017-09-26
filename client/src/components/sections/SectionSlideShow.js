import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'

import sectionContainer from '../../containers/sections/sectionContainer'
import renderComponents from './renderComponents'

class SectionSlideShow extends Component {
  state = {
    index: 0,
    intervalId: null
  }
  componentDidMount() {
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
      item: {
        _id,
        items,
        values: {
          pageLink
        }
      },
      style
    } = this.props
    return (
      <section style={style} id={pageLink || _id}>
        <CSSTransitionGroup
          transitionName="cross-fade"
          transitionEnter={true}
          transitionEnterTimeout={2000}
          transitionLeave={true}
          transitionLeaveTimeout={2000}

        >
          {renderComponents({ components: items })[this.state.index]}
        </CSSTransitionGroup>
      </section>
    )
  }
}

SectionSlideShow.propTypes = {
  autoplay: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
}

export default sectionContainer(SectionSlideShow)
