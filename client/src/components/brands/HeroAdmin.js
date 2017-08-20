import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderSelectField from '../../components/fields/renderSelectField'
import renderTextField from '../../components/fields/renderTextField'
import { fetchUpdate } from '../../actions/brand'

const fields = [
  { name: 'buttonColor', type: 'text' },
  { name: 'mediaElevation', type: 'number' },
  { name: 'h1Color', type: 'text' },
  { name: 'h1TextShadow', type: 'text' },
  { name: 'h2Color', type: 'text' },
  { name: 'h2TextShadow', type: 'text' },
  { name: 'h3Color', type: 'text' },
  { name: 'h3TextShadow', type: 'text' },
]

const HeroAdmin = ({
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
      onSubmit={handleSubmit((values) => {
        const path = `hero/${_id}`
        return dispatch(fetchUpdate(path, { values }))
      })}
    >
      <CardTitle title="Hero" />
      <div className="field-container">
        {fields.map(({ name, type }) => (
          <Field
            key={name}
            name={name}
            label={name}
            type={type}
            component={renderTextField}
            className="field"
            style={{ fontFamily }}
          />
        ))}
      </div>
      {error && <div className="error">{error}</div>}
      <div className="button-container">
        <SuccessableButton
          submitSucceeded={submitSucceeded}
          submitting={submitting}
          label="update hero"
          successLabel="hero updated!"
        />
      </div>
    </form>
  </Card>
)

export default reduxForm({ form: 'heroAdmin' })(HeroAdmin)
