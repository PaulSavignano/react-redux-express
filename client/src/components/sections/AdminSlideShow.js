import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'

import './section.css'
import slideShowContainer from '../../containers/sections/slideShowContainer'
import AdminSectionButtons from './AdminSectionButtons'
import renderAdminComponents from './renderAdminComponents'
import { startEdit } from '../../actions/editItem'

class SlideShow extends Component {
  state = {
    index: 0,
    intervalId: null
  }
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit({ item, kind: 'SECTION' }))
  }
  componentWillMount() {
    if (this.props.autoplay) {
      this.start()
    }
  }
  componentWillReceiveProps({ autoplay }) {
    if (this.props.autoplay !== autoplay) {
      if (!autoplay) {
        this.stop()
      } else {
        this.start()
      }
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
      dispatch,
      item,
      pageId,
      pageSlug,
      propsForParent,
      propsForChild,
    } = this.props
    return (
      <div className="admin-section">
        <section {...propsForParent}>
          <CSSTransitionGroup
            transitionName="cross-fade"
            transitionEnter={true}
            transitionEnterTimeout={2000}
            transitionLeave={true}
            transitionLeaveTimeout={2000}
            {...propsForChild}
          >
            {renderAdminComponents({ components: item.items })[this.state.index]}
          </CSSTransitionGroup>
        </section>
        <AdminSectionButtons
          dispatch={dispatch}
          item={item}
          pageId={pageId}
          pageSlug={pageSlug}
        />
      </div>
    )
  }
}

export default slideShowContainer(SlideShow)
