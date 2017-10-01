import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'

import sectionContainer from '../../containers/sections/sectionContainer'
import ComponentSwitch from './ComponentSwitch'

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
      containerProps,
      item: {
        _id,
        items,
        values: {
          pageLink
        }
      },
      sectionProps
    } = this.props
    return (
      <div {...containerProps}>
        <section {...sectionProps} id={pageLink || _id}>
          <CSSTransitionGroup
            transitionName="cross-fade"
            transitionEnter={true}
            transitionEnterTimeout={2000}
            transitionLeave={true}
            transitionLeaveTimeout={2000}
          >
            <ComponentSwitch
              component={items[this.state.index]}
              key={items[this.state.index].item._id}
            />
          </CSSTransitionGroup>
        </section>
      </div>

    )
  }
}

SectionSlideShow.propTypes = {
  autoplay: PropTypes.bool.isRequired,
  containerProps: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  sectionProps: PropTypes.object.isRequired,
}

export default sectionContainer(SectionSlideShow)
