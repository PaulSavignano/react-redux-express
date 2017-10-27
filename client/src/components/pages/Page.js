import React, { Component } from 'react'
import PropTypes from 'prop-types'

import pageContainer from '../../containers/pages/pageContainer'
import SectionSwitch from './SectionSwitch'

class Page extends Component {
  componentDidMount() {
    const { hash } = window.location
    if (hash) return this.scrollToId(hash)
    window.scrollTo(0, 0)
  }
  componentWillReceiveProps({ page: { _id }}) {
    const { hash } = window.location
    if (this.props.page._id !== _id) {
      if (hash) return this.scrollToId(hash)
      window.scrollTo(0, 0)
    }

  }
  scrollToId = (hash) => {
    const id = hash.replace('#', '')
    const element = document.getElementById(id)
    if (element) return element.scrollIntoView({ block: "start", behavior: "smooth" })
  }
  render() {
    const {
      dispatch,
      page: {
        _id,
        slug,
        sections,
        values: { backgroundColor }
      },
      propsForParent
    } = this.props
    return (
      <div {...propsForParent}>
        {sections.map(section => (
          <SectionSwitch
            dispatch={dispatch}
            key={section._id}
            pageId={_id}
            pageSlug={slug}
            section={section}
          />
        ))}
      </div>
    )
  }
}

Page.propTypes = {
  page: PropTypes.object.isRequired,
}

export default pageContainer(Page)
