import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardText, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'

import SuccessableButton from '../forms/SuccessableButton'
import renderTextField from '../forms/renderTextField'
import normalizePhone from '../../utils/normalizePhone'
import { fetchUpdate, fetchDelete } from '../../actions/users'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'firstName', 'lastName', 'email' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match'
  }
  return errors
}

class ProfileForm extends Component {
  state = {
    open: false
  }
  render() {
    const { dispatch, error, handleSubmit, item, imageSpec, submitSucceeded, submitting } = this.props
    return (
      <Card className="cards">
        <form onSubmit={handleSubmit(values => {
          const update = { type: 'UPDATE_VALUES', values}
          dispatch(fetchUpdate(update))
        })}
        >
          <div className="field-container">
            <Field name="firstName" component={renderTextField} label="First Name" className="field" />
            <Field name="lastName" component={renderTextField} label="Last Name" className="field" />
            <Field name="email" component={renderTextField} label="Email" className="field" />
            <Field name="phone" component={renderTextField} label="Phone" normalize={normalizePhone} className="field" />
            <Field name="password" component={renderTextField} label="Password" type="password" className="field" />
            <Field name="passwordConfirm" component={renderTextField} label="Password Confirm" type="password" className="field"/>

          </div>
          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              label="USER"
            />
            <RaisedButton
              type="button"
              label="Delete Account"
              className="button delete-button"
              onTouchTap={() => dispatch(fetchDelete())}
            />
          </div>
        </form>
      </Card>
    )
  }
}


ProfileForm = reduxForm({
  form: 'profile',
  validate
})(ProfileForm)

ProfileForm = connect()(ProfileForm)

export default ProfileForm
