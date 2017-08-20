import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'

import SuccessableButton from '../buttons/SuccessableButton'
import renderTextField from '../fields/renderTextField'
import { fetchUpdate } from '../../actions/brand'

const BodyAdmin = ({
  _id,
  backgroundColor,
  dispatch,
  error,
  fontFamily,
  handleSubmit,
  submitSucceeded,
  submitting
}) => (
  <Card
    className="card"
    style={{ backgroundColor, fontFamily }}
  >
    <form
      onSubmit={handleSubmit(values => dispatch(fetchUpdate(`body/${_id}`, { values })))}
        >
          <CardTitle title="Body" />
      <div className="field-container">
        <Field
          name="backgroundColor"
          label="backgroundColor"
          type="text"
          component={renderTextField}
          className="field"
          style={{ fontFamily }}
        />
      </div>
      {error && <div className="error">{error}</div>}
      <div className="button-container">
        <SuccessableButton
          submitSucceeded={submitSucceeded}
          submitting={submitting}
          label="update body"
          successLabel="body updated!"
        />
      </div>
    </form>
  </Card>
)

export default reduxForm({ form: 'bodyAdmin' })(BodyAdmin)
