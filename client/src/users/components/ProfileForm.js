import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardTitle, CardMedia, CardText, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdate, fetchDelete } from '../actions/index'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'firstName', 'lastName', 'email', 'password', 'passwordConfirm' ]
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

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

let ProfileForm = ({ dispatch, handleSubmit, user, submitSucceeded, error, initialValues }) => (
  <main>
    <section>
      <Card>
        <CardTitle title="Profile" subtitle="Enter your information" />
        <form onSubmit={handleSubmit(values => dispatch(fetchUpdate({ values })))} >
          <CardText>
            <Field name="firstName" component={renderTextField} label="First Name" fullWidth={true} />
            <Field name="lastName" component={renderTextField} label="Last Name" fullWidth={true} />
            <Field name="email" component={renderTextField} label="Email" fullWidth={true} />
            <Field name="phone" component={renderTextField} label="Phone" fullWidth={true} />
            <Field name="newPassword" component={renderTextField} label="New Password" fullWidth={true} type="password" />
            <Field name="newPasswordConfirm" component={renderTextField} label="New Password Confirm" fullWidth={true} type="password"/>
            <Field name="address" component={renderTextField} label="Address" fullWidth={true} />
            <Field name="zip" component={renderTextField} label="Zip" fullWidth={true} />
            <Field name="state" component={renderTextField} label="State" fullWidth={true} />
            {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
          </CardText>
          <CardActions>
            <RaisedButton
              type="submit"
              label={submitSucceeded ? "Updated" : "Update"}
              labelColor="#ffffff"
              primary={submitSucceeded ? false : true}
              backgroundColor={submitSucceeded ? "#4CAF50" : null }
              style={{ flex: '1 1 auto', margin: 8 }}
            />
            <RaisedButton
              type="button"
              label="Delete Account"
              primary={true}
              style={{ flex: '1 1 auto', margin: 8 }}
              onTouchTap={() => dispatch(fetchDelete())}
            />
          </CardActions>
        </form>
      </Card>
    </section>
  </main>
)


ProfileForm = reduxForm({
  form: 'profile',
  validate
})(ProfileForm)

ProfileForm = connect()(ProfileForm)

export default ProfileForm
