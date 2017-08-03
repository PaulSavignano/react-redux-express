import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchAdd } from '../../actions/sections'

const AdminSectionAdd = ({ dispatch, page }) => (
  <section style={{ display: 'flex' }}>
    <RaisedButton
      label="Add New Section"
      primary={true}
      style={{ margin: '4px 8px 8px', flex: '1 1 auto' }}
      onTouchTap={() => dispatch(fetchAdd({ pageId: page._id, pageSlug: page.slug }))}
    />
  </section>
)

export default connect()(AdminSectionAdd)
