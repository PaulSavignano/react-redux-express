import React from 'react'

import SectionItem from './SectionItem'

const SectionList = ({ sections }) => (
  <div>
    {sections.map(section => (
      <SectionItem
        key={section._id}
        section={section}
      />
    ))}
  </div>
)

export default SectionList
