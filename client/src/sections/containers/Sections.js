import React from 'react'
import { connect } from 'react-redux'

import SectionList from '../components/SectionList'

const Sections = ({ isFetching, brand, sections }) => (
  !isFetching && <SectionList sections={sections} brand={brand} />
)

const mapStateToProps = ({ brand, sections }, { page }) => ({
  isFetching: sections.isFetching,
  sections: sections.items.filter(value => value.pageId === page._id),
  brand
})

export default connect(mapStateToProps)(Sections)
