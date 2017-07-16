import React from 'react'
import { connect } from 'react-redux'
import { Card, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchAdd } from '../../actions/sections'

const AdminSectionAdd = ({ dispatch, page }) => (
  <section>
    <RaisedButton
      label="Add New Section"
      primary={true}
      fullWidth={true}
      onTouchTap={() => {
        const add = {
          pageId: page._id,
          pageSlug: page.slug,
        }
        dispatch(fetchAdd(add))
      }}
    />
  </section>
)

export default connect()(AdminSectionAdd)
