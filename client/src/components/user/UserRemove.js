import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import normalizePhone from '../../utils/normalizePhone'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'password', 'passwordConfirm' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match'
  }
  return errors
}

class UserProfileForm extends Component {
  render() {
    const {
      dirty,
      dispatch,
      error,
      handleSubmit,
      onDelete,
      onFormSubmit,
      reset,
      submitSucceeded,
      submitting,
      valid
    } = this.props
    return (
      <div>
        <CardTitle title="Remove Accout" />
        <form onSubmit={handleSubmit(onDelete)}>
          <div className="field-container">
            <Field name="password" component={renderTextField} label="Update Password" type="password" className="field" />
            <Field name="passwordConfirm" component={renderTextField} label="Confirm Password" type="password" className="field"/>
          </div>
          <div className="button-container">
            <RaisedButton
              type="submit"
              label="Delete Account"
              className="button delete-button"
            />
          </div>
        </form>
      </div>
    )
  }
}

UserProfileForm.propTypes = {
  destroy: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
}

export default reduxForm({ enableReinitialize: true, validate })(UserProfileForm)
