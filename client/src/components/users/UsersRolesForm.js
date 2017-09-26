import React from 'react'
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
  invalid,
  pristine,
  reset,
  submitSucceeded,
  submitting,
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
      <div className="button-container">
        <SuccessableButton
          disabled={pristine || invalid}
          error={error}
          label="Update Roles"
          reset={reset}
          submitSucceeded={submitSucceeded}
          submitting={submitting}
          successLabel="Roles Updated!"
        />
      </div>
    </form>
  </Card>
)

UsersRolesForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleUserRoles: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default reduxForm({ enableReinitialize: true })(UsersRolesForm)
