import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import renderHTML from 'react-render-html'
import { Card, CardMedia, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import slideShowContainer from '../../containers/sections/slideShowContainer'
import AdminSectionAdd from './AdminSectionAdd'
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
      autoplay,
      dispatch,
      item: {
        _id,
        items
      },
      pageId,
      pageSlug,
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
          {renderAdminComponents({ components: items })[this.state.index]}
        </CSSTransitionGroup>
        <div style={{ display: 'flex', position: 'absolute', bottom: 8, right: 8 }}>
          <AdminSectionAdd
            dispatch={dispatch}
            pageId={pageId}
            pageSlug={pageSlug}
            sectionId={_id}
          />
          <RaisedButton
            label="Edit Section"
            onTouchTap={this.handleStartEdit}
            style={{ margin: 8 }}
          />
        </div>
      </section>
    )
  }
}

export default slideShowContainer(SlideShow)
