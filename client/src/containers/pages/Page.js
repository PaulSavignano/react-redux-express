import React, { Component } from 'react'

import pageContainer from './pageContainer'
import SectionList from '../../containers/sections/SectionList'

class Page extends Component {
  state = {
    timeoutId: null
  }
  componentDidMount() {
    const { hash } = window.location;
    if (hash !== '') {
      const timeoutId = setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({block: "start", behavior: "smooth"});
      }, 300);
      this.setState({ timeoutId })
    } else {
      window.scrollTo(0, 0)
    }
  }
  componentWillUnmount() {
    clearTimeout(this.state.timeoutId)
  }
  render() {
    const { sections } = this.props
    return (
      <SectionList items={sections} />
    )
  }
}


export default pageContainer(Page)
