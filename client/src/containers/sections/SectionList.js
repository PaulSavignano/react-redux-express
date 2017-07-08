import React from 'react'
import { connect } from 'react-redux'

import SectionItem from './SectionItem'

const SectionList = ({ isFetching, sections }) => (
  !isFetching &&
  <div>
    {sections.map(section => (
      <SectionItem
        key={section._id}
        section={section}
      />
    ))}
  </div>
)

const mapStateToProps = ({ sections: { isFetching, items } }, { pageId }) => {
  const sections = items.filter(item => item.pageId === pageId)
  return {
    isFetching,
    sections
  }
}


export default connect(mapStateToProps)(SectionList)
