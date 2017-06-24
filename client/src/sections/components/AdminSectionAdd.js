import React from 'react'
import { connect } from 'react-redux'
import { Card, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchAdd } from '../actions/index'

const AdminSectionAdd = ({ dispatch, page }) => (
  <Card containerStyle={{ margin: '0 0 64px 0' }}>
    <CardActions>
      <RaisedButton
        label="Add New Section"
        primary={true}
        fullWidth={true}
        onTouchTap={() => {
          const add = {
            pageId: page._id,
            pageName: page.slug,
          }
          dispatch(fetchAdd(add))
        }}
      />
    </CardActions>
  </Card>
)


export default connect()(AdminSectionAdd)
