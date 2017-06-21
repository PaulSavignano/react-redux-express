import React from 'react'
import { connect } from 'react-redux'

import AdminSectionAdd from '../components/AdminSectionAdd'
import AdminSectionList from '../components/AdminSectionList'

const imageSpec = {
  type: 'image/jpg',
  width: 1920,
  height: 1080
}

const AdminSections = ({ isFetching, page, sections }) => {
  return (
    isFetching ? null :
    <section style={{ maxWidth: 2000 }}>
      <AdminSectionList page={page} sections={sections} imageSpec={imageSpec} />
      <AdminSectionAdd page={page} />
    </section>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.cards.isFetching,
  sections: state.sections.items.filter(item => item.pageId === ownProps.page._id)
})

export default connect(mapStateToProps)(AdminSections)
