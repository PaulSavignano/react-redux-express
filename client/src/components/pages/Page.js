import React, { Component } from 'react'
import PropTypes from 'prop-types'

import pageContainer from '../../containers/pages/pageContainer'
import ArticleSection from '../articles/ArticleSection'
import CardSection from '../cards/CardSection'
import HeroSection from '../heros/HeroSection'
import ProductSection from '../products/ProductSection'
import SwipeableSection from '../swipeables/SwipeableSection'

const renderSections = (sections) => {
  const sectionList = (section) => {
    const { kind } = section
    switch(type) {
      case 'ArticleSection':
        return <ArticleSection key={section._id} section={section} />
      case 'CardSection':
        return <CardSection key={section._id} section={section} />
      case 'HeroSection':
        return <HeroSection key={section._id} section={section} />
      case 'ProductSection':
        return <ProductSection key={section._id} section={section} />
      case 'SwipeableSection':
        return <SwipeableSection key={section._id} section={section} />
      default:
        return
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
        {renderComponents(page.sections)}
      </div>
    )
  }
}

Page.propTypes = {
  page: PropTypes.object.isRequired,
}

export default pageContainer(Page)
