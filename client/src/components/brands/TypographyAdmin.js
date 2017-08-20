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
  'h1FontFamily',
  'h1FontSize',
  'h1FontWeight',
  'h1LetterSpacing',
  'h1LineHeight',
  'h2FontFamily',
  'h2FontSize',
  'h2FontWeight',
  'h2LetterSpacing',
  'h2LineHeight',
  'h3FontFamily',
  'h3FontSize',
  'h3FontWeight',
  'h3LetterSpacing'
]

const TypographyAdmin = ({
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
      <CardTitle title="Typography" />
      <div className="field-container">
        {fields.map(field => (
          <Field
            key={field}
            name={field}
            label={field}
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

export default reduxForm({ form: 'typographyAdmin' })(TypographyAdmin)
