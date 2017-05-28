import React from 'react'
import { connect } from 'react-redux'

import SectionList from '../components/SectionList'

const Sections = ({ isFetching, page, sections, brand }) => (
  isFetching ? null :
    <SectionList page={page} sections={sections} brand={brand} />
)

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.sections.isFetching,
  sections: state.sections.items.filter(item => item.pageId === ownProps.page._id),
  brand: state.brand.values
})

export default connect(mapStateToProps)(Sections)
