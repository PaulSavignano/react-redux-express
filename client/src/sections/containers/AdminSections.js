import React from 'react'
import { connect } from 'react-redux'

import AdminSectionAdd from '../components/AdminSectionAdd'
import AdminSectionList from '../components/AdminSectionList'

const imageSize = {
  width: 1920,
  height: 1080
}
const placeholdit = `https://placehold.it/${imageSize.width}x${imageSize.height}`

const AdminSections = ({ isFetching, page, items }) => {
  return (
    isFetching ? null :
    <div style={{ margin: '0 20px 20px 20px' }}>
      <AdminSectionList page={page} items={items} imageSize={imageSize} placeholdit={placeholdit} />
      <br/><br/><br/>
      <AdminSectionAdd page={page} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.cards.isFetching,
  items: state.sections.items.filter(item => item.pageId === ownProps.page._id)
})

export default connect(mapStateToProps)(AdminSections)
