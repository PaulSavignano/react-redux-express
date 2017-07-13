import React from 'react'
import { connect } from 'react-redux'

import SectionItem from '../../components/sections/SectionItem'

const SectionList = ({ isFetching, sections }) => {
  console.log('sections', sections)
  return (
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
}



const mapStateToProps = ({ sections: { isFetching, items }}, { page }) => ({
  isFetching,
  sections: items.filter(item => item.pageId === page._id)
})


export default connect(mapStateToProps)(SectionList)
