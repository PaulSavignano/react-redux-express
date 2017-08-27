import React, { Component } from 'react'
import PropTypes from 'prop-types'

import pageContainer from '../../containers/pages/pageContainer'
import Section from '../sections/Section'
import SwipeableSection from '../sections/SwipeableSection'

const renderSections = ({ dispatch, sections }) => {
  const sectionList = (section) => {
    const { kind } = section
    switch(kind) {
      case 'Flex':
        return <Section dispatch={dispatch} key={section._id} item={section.section} />
      case 'Swipeable':
        return <SwipeableSection dispatch={dispatch} key={section._id} item={section.section} />
      default:
        return <Section dispatch={dispatch} key={section._id} item={section.section} />
    }
  }
  return sections.map(section => sectionList(section))
}

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
  componentWillReceiveProps(nextProps, nextState) {
    const { hash } = nextProps
    if (hash !== '') {
      return this.scrollToId(hash)
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
      page: { sections }
    } = this.props
    return (
      <div>
        {renderSections({
          dispatch,
          sections,
        })}
      </div>
    )
  }
}

Page.propTypes = {
  page: PropTypes.object.isRequired,
}

export default pageContainer(Page)
