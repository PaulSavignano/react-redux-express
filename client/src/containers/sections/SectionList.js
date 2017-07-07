import React, { Component } from 'react'

import SectionItem from './SectionItem'

class SectionList extends Component {
  render() {
  const { sections, brand } = this.props
  return (
    !sections.length ? null :
      <div>
        {sections.map(section => (
          <SectionItem
            key={section._id}
            section={section}
            brand={brand}
          />
        ))}
      </div>
    )
  }
}


export default SectionList
