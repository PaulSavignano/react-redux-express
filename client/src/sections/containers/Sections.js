import React from 'react'
import { connect } from 'react-redux'

import SectionList from '../components/SectionList'

const Sections = ({ isFetching, page, items }) => (
  isFetching ? null :
    <SectionList page={page} items={items} />
)

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.sections.isFetching,
  items: state.sections.items.filter(item => item.pageId === ownProps.page._id)
})

export default connect(mapStateToProps)(Sections)
