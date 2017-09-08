import React, { Component } from 'react'
import PropTypes from 'prop-types'

import pageContainer from '../../containers/pages/pageContainer'
import renderSections from './renderSections'

class Page extends Component {
  state = {
    hash: null,
    timeoutId: null
  }
  componentDidMount() {
    const { hash } = this.props
    if (hash !== '') {
      return this.scrollToId(hash)
    }
    window.scrollTo(0, 0)
  }
  componentWillReceiveProps({ pathname, hash }, nextState) {
    if (pathname !== this.props.pathname) {
      if (hash !== '') {
        this.scrollToId(hash)
      } else {
        window.scrollTo(0, 0)
      }
    }
  }
  componentWillUnmount() {
    clearTimeout(this.state.timeoutId)
  }
  scrollToId = (hash) => {
    const timeoutId = setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({block: "start", behavior: "smooth"});
    }, 300)
    this.setState({ timeoutId })
  }
  render() {
    const {
      dispatch,
      page: { _id, slug, sections }
    } = this.props
    return (
      <div>
        {renderSections({
          dispatch,
          sections,
          pageId: _id,
          pageSlug: slug
        })}
      </div>
    )
  }
}

Page.propTypes = {
  page: PropTypes.object.isRequired,
}

export default pageContainer(Page)
