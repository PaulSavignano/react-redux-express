import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
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

const ProfileForm = ({ dispatch, error, handleSubmit, isFetching, submitSucceeded, submitting }) => (
  !isFetching &&
  <Card>
    <CardTitle title="Profile" />
    <form onSubmit={handleSubmit(values => {
      const update = { type: 'UPDATE_VALUES', values}
      return dispatch(fetchUpdate(update))
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
          label="update user"
          successLabel="user updated!"
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

export default compose(
  connect(({ user: { isFetching, values }}) => ({
    isFetching,
    initialValues: values
  })),
  reduxForm({
    form: 'profile',
    validate
  })
)(ProfileForm)
