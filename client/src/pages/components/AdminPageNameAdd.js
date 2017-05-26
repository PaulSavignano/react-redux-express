import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchAdd } from '../actions/index'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'name' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  return errors
}

const renderTextField = ({ input, label, submissionError, meta: { touched, error }, ...custom }) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={(touched && error) || submissionError}
    {...input}
    {...custom}
  />
)

class AdminPageNameAdd extends Component {
  render() {
    const { error, handleSubmit, dispatch } = this.props
    return (
      <Card className="cards">
        <form
          onSubmit={handleSubmit(values => dispatch(fetchAdd(values)))}
        >
          <CardText style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center' }}>
            <div style={{ flex: '1 1 auto' }}>
              <Field
                name="name"
                label="Add Page Name"
                type="text"
                component={renderTextField}
                fullWidth={true}
                submissionError={error}
              />
            </div>
            <RaisedButton type="submit" label="Add" primary={true}/>
          </CardText>
        </form>
      </Card>
    )
  }
}

AdminPageNameAdd = reduxForm({
  form: 'AdminPageAdd',
  validate
})(AdminPageNameAdd)

export default AdminPageNameAdd
