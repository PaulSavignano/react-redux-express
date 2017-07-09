import React from 'react'
import { connect } from 'react-redux'

import SectionList from '../../components/sections/SectionList'

const SectionsContainer = ({ isFetching, sections }) => (
  !isFetching && <SectionList sections={sections} />
)

const mapStateToProps = ({ sections: { isFetching, items }}, { page }) => ({
  isFetching,
  sections: items.filter(item => item.pageId === page._id)
})


export default connect(mapStateToProps)(SectionsContainer)
