import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'

import './section.css'
import sectionContainer from '../../containers/sections/sectionContainer'
import AdminSectionEditButtons from './AdminSectionEditButtons'
import AdminComponentSwitch from './AdminComponentSwitch'
import { startEdit } from '../../actions/editItem'

class AdminSectionSlideShow extends Component {
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
      containerProps,
      dispatch,
      item,
      pageId,
      pageSlug,
      sectionProps,
    } = this.props
    const { items } = item
    return (
      <div {...containerProps} className="AdminSectionSlideShow">
        <section {...sectionProps}>
          <CSSTransitionGroup
            transitionName="cross-fade"
            transitionEnter={true}
            transitionEnterTimeout={2000}
            transitionLeave={true}
            transitionLeaveTimeout={2000}
          >
            <AdminComponentSwitch
              component={items[this.state.index]}
              key={items[this.state.index].item._id}
              pageSlug={pageSlug}
            />
          </CSSTransitionGroup>
        </section>
        <AdminSectionEditButtons
          dispatch={dispatch}
          item={item}
          pageId={pageId}
          pageSlug={pageSlug}
        />
      </div>
    )
  }
}

AdminSectionSlideShow.propTypes = {
  autoplay: PropTypes.bool.isRequired,
  containerProps: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired,
  pageSlug: PropTypes.string.isRequired,
  sectionProps: PropTypes.object.isRequired,
}

export default sectionContainer(AdminSectionSlideShow)
