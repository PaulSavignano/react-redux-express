import React from 'react'
import { connect } from 'react-redux'

import SectionList from './SectionList'

const Sections = ({ isFetching, brand, sections }) => (
  !isFetching && <SectionList sections={sections} brand={brand} />
)

const mapStateToProps = ({ brand, sections: { isFetching, items } }, { page }) => ({
  isFetching,
  sections: items.filter(value => value.pageId === page._id),
  brand
})

export default connect(mapStateToProps)(Sections)
