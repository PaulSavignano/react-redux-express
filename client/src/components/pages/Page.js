import React, { Component } from 'react'
import PropTypes from 'prop-types'

import pageContainer from '../../containers/pages/pageContainer'
import Section from '../sections/Section'

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
      console.log(hash)
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
    const { page } = this.props
    console.log('page', page)
    return (
      <div>
        {page.sections.map(section => {
          console.log('section', section)
          return (
            <Section
              key={section._id}
              item={section}
            />
          )
        })}
      </div>
    )
  }
}

Page.propTypes = {
  page: PropTypes.object.isRequired,
}

export default pageContainer(Page)
