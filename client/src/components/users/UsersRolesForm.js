import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'
import Checkbox from 'material-ui/Checkbox'

import SuccessableButton from '../../components/buttons/SuccessableButton'

const renderCheckbox = ({ input, label, className }) =>
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
    className={className}
  />


const UsersRolesForm = ({
  dispatch,
  error,
  handleSubmit,
  handleUserRoles,
  submitSucceeded,
  submitting
}) => (
  <Card className="UsersRolesForm card">
    <CardTitle title="Roles" />
    <form onSubmit={handleSubmit(handleUserRoles)}>
      <div className="checkbox-container">
        <Field
          name="user"
          component={renderCheckbox}
          label="User"
          className="checkbox"
        />
        <Field
          name="admin"
          component={renderCheckbox}
          label="Admin"
          className="checkbox"
        />
        <Field
          name="owner"
          component={renderCheckbox}
          label="Owner"
          className="checkbox"
        />
      </div>

      {error && <div className="error">{error}</div>}
      <div className="button-container">
        <SuccessableButton
          submitSucceeded={submitSucceeded}
          submitting={submitting}
          label="update roles"
          successLabel="roles updated!"
        />
      </div>
    </form>
  </Card>
)

UsersRolesForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleUserRoles: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}

export default reduxForm({})(UsersRolesForm)
