import React from 'react'
import { connect } from 'react-redux'
import { Card, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchAdd } from '../actions/index'

const AdminCardAdd = ({ dispatch, section, imageSize }) => (
    <CardActions>
      <RaisedButton
        type="submit"
        label="Add New Card"
        primary={true}
        fullWidth={true}
        onTouchTap={() => {
          const add = { sectionId: section._id }
          dispatch(fetchAdd(add))
        }}
      />
    </CardActions>
)


export default connect()(AdminCardAdd)
