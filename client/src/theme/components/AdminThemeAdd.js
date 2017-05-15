import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchAdd } from '../actions/index'


class AdminPageNameAdd extends Component {
  render() {
    const { error, handleSubmit, dispatch } = this.props
    return (
      <section>
        <Card>
          <CardActions>
            <RaisedButton
              label="Add"
              primary={true}
              fullWidth={true}
              onTouchTap={() => dispatch(fetchAdd())}
            />
          </CardActions>
        </Card>
      </section>
    )
  }
}

AdminPageNameAdd = reduxForm({
  form: 'AdminPageAdd',
})(AdminPageNameAdd)

export default AdminPageNameAdd
